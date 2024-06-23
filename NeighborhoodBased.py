import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.neighbors import NearestNeighbors
import pyodbc 
import pickle

# Dữ liệu rating
user = []

# Dữ liệu hành vi
seller = []

def prepare_data():
    def ParseRating(rating):
        d = dict()
        d["user"] = rating[0]
        d["sellerid"] = rating[1]
        d["rating"] = rating[2]
        return d

    def ParseBehavior(rating):
        d = dict()
        d["user"] = rating[0]
        d["sellerid"] = rating[1]
        d["behavior"] = rating[2]
        return d
    conn_str = 'DRIVER=ODBC Driver 17 for SQL Server; Server=localhost; Database=ShopRecommend; Trusted_Connection=yes;'

    with pyodbc.connect(conn_str) as conn:
        cursor = conn.cursor()
        cursor.execute("Exec SetBehaviorRating")
        cursor.execute("Exec SellerAvg")
        cursor.execute("Exec SetAvgRating")
        conn.commit()
    behavior_df = []
    with pyodbc.connect(conn_str) as conn:
        cursor = conn.cursor()
        cursor.execute("select ACCOUNTID, SELLERID, B_RATING from ACOOUUNT_BEHAVIOR_RATING")
        result = cursor.fetchall()
        for rating in result:
            behavior_df.append(ParseBehavior(rating))
        behavior_df = pd.DataFrame(behavior_df)
    ratings_df = []
    with pyodbc.connect(conn_str) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT ACCOUNTID, SELLERID, RATING FROM AVG_RATING")
        result = cursor.fetchall()
        for rating in result:
            ratings_df.append(ParseRating(rating))
        ratings_df = pd.DataFrame(ratings_df)

    user_rate = ratings_df['user'].unique()
    user_behavior = behavior_df['user'].unique()
    user = np.unique(np.concatenate((user_rate, user_behavior)))

    seller_rate = ratings_df['sellerid'].unique()
    seller_behavior = behavior_df['sellerid'].unique()
    seller = np.unique(np.concatenate((seller_rate, seller_behavior)))

    with open('artifacts/Knn_List_User.pkl', 'wb') as f:
        pickle.dump(user, f)
    with open('artifacts/Knn_List_Seller.pkl', 'wb') as f:
        pickle.dump(seller, f)

    df_rate = pd.DataFrame(np.zeros((len(user), len(seller)), dtype=int), index=user, columns=seller)
    df_rate.index.name = 'user'
    df_rate.columns.name = 'seller'
    df_behavior  = pd.DataFrame(df_rate)

    # Điền rating và matrix
    for idex, rate in ratings_df.iterrows():
        df_rate.loc[int(rate['user']), int(rate['sellerid'])] = float(rate['rating'])

    # Điền rating và matrix
    for idex, rate in behavior_df.iterrows():
        df_behavior.loc[int(rate['user']), int(rate['sellerid'])] = float(rate['behavior'])
        
    return df_rate, df_behavior


class MatrixFactorization:
    def __init__(self, R, K, alpha, beta, iterations):
        self.R = R
        self.num_users, self.num_sellers = R.shape
        self.K = K
        self.alpha = alpha
        self.beta = beta
        self.iterations = iterations

    def train(self):
        self.P = np.random.normal(scale=1./self.K, size=(self.num_users, self.K))
        self.Q = np.random.normal(scale=1./self.K, size=(self.num_sellers, self.K))
        self.b_u = np.zeros(self.num_users)
        self.b_s = np.zeros(self.num_sellers)
        self.b = np.mean(self.R[np.where(self.R != 0)])
        self.samples = [
            (i, j, self.R[i, j])
            for i in range(self.num_users)
            for j in range(self.num_sellers)
            if self.R[i, j] > 0
        ]
        
        for i in range(self.iterations):
            np.random.shuffle(self.samples)
            self.sgd()
            mse = self.mse()
            print(f"Iteration: {i+1} ; error = {mse:.4f}")
            
        return self.full_matrix()

    def mse(self):
        xs, ys = self.R.nonzero()
        predicted = self.full_matrix()
        error = 0
        for x, y in zip(xs, ys):
            error += pow(self.R[x, y] - predicted[x, y], 2)
        return np.sqrt(error)
        
    def sgd(self):
        for i, j, r in self.samples:
            prediction = self.get_prediction(i, j)
            e = (r - prediction)
            self.b_u[i] += self.alpha * (e - self.beta * self.b_u[i])
            self.b_s[j] += self.alpha * (e - self.beta * self.b_s[j])
            self.P[i, :] += self.alpha * (e * self.Q[j, :] - self.beta * self.P[i, :])
            self.Q[j, :] += self.alpha * (e * self.P[i, :] - self.beta * self.Q[j, :])
            
    def get_prediction(self, i, j):
        prediction = self.b + self.b_u[i] + self.b_s[j] + self.P[i, :].dot(self.Q[j, :].T)
        return prediction
    
    def full_matrix(self):
        return self.b + self.b_u[:, np.newaxis] + self.b_s[np.newaxis:, ] + self.P.dot(self.Q.T)

def knn_with_weights_and_mf(user_rating_matrix, user_implicit_matrix, n_neighbors=5):
    # Train Matrix Factorization model
    mf = MatrixFactorization(user_rating_matrix.values, K=5, alpha=0.01, beta=0.01, iterations=20)
    mf.train()
    predicted_ratings = mf.full_matrix()
    
    # Compute cosine similarity between users based on rating matrix and implicit matrix
    user_similarity1 = cosine_similarity(predicted_ratings)
    user_similarity2 = cosine_similarity(user_implicit_matrix)
    user_similarity = (user_similarity1 + user_similarity2) / 2.0  # Combine similarities
    
    # Create a Nearest Neighbors model based on combined cosine similarity
    knn = NearestNeighbors(metric='cosine', algorithm='brute', n_neighbors=n_neighbors, n_jobs=-1)
    knn.fit(user_similarity)
    
    # Find nearest neighbors for each user
    _, neighbor_indices = knn.kneighbors(user_similarity, n_neighbors=n_neighbors + 1)  # +1 to exclude self
    
    # Calculate weights based on similarity
    weights = np.zeros_like(user_similarity)
    for i in range(user_similarity.shape[0]):
        neighbor_indexes = neighbor_indices[i, 1:]  # exclude self
        neighbor_similarities = user_similarity[i, neighbor_indexes]
        weights[i, neighbor_indexes] = neighbor_similarities / np.sum(neighbor_similarities)
    
    # Combine MF predictions with weighted neighbor ratings
    final_predictions = np.zeros_like(predicted_ratings)
    for i in range(user_similarity.shape[0]):
        neighbor_indexes = neighbor_indices[i, 1:]  # exclude self
        neighbor_ratings = user_rating_matrix.values[neighbor_indexes]
        final_predictions[i] = predicted_ratings[i] + np.sum(weights[i, neighbor_indexes, np.newaxis] * (neighbor_ratings - predicted_ratings[neighbor_indexes]), axis=0)
    
    return final_predictions

def recommend(user_id, final_predictions, user_rating_matrix, top_n=5):
    # Sort predicted ratings for the user and get top n recommendations
    predicted_ratings = final_predictions[user_id]
    rated_items = user_rating_matrix.iloc[user_id].values
    unrated_items = np.where(rated_items == 0)[0]
    top_indices = np.argsort(predicted_ratings[unrated_items])[::-1][:top_n]
    top_sellers = user_rating_matrix.columns[unrated_items[top_indices]]
    top_ratings = predicted_ratings[unrated_items[top_indices]]
    return list(zip(top_sellers, top_ratings))

def train():
    df_rate, df_behavior = prepare_data()
    print("chuan bi xong du lieu")
    final_predictions = knn_with_weights_and_mf(df_rate, df_behavior)
    with open('artifacts/final_predictions.pkl', 'wb') as f:
        pickle.dump(final_predictions, f)

def write_model_to_db():
    conn_str = 'DRIVER=ODBC Driver 17 for SQL Server; Server=localhost; Database=ShopRecommend; Trusted_Connection=yes;'
    users = pickle.load(open(f'artifacts/Knn_List_User.pkl','rb'))
    sellers = pickle.load(open(f'artifacts/Knn_List_Seller.pkl','rb'))
    final_predictions = pickle.load(open(f'artifacts/final_predictions.pkl','rb'))

    with pyodbc.connect(conn_str) as conn:
        
        cursor = conn.cursor()
        cursor.execute("truncate table ACCOUNT_SELLER_PRIORITY")
        conn.commit()
        for row in range(0, len(final_predictions)):
            idx = 0
            seller_rating_matrix = np.vstack([sellers, final_predictions[row]])
            sorted_indices = np.argsort(seller_rating_matrix[1])
            sorted_matrix = seller_rating_matrix[:, sorted_indices]
            for rate in sorted_matrix[1]:
                cursor.execute(f"INSERT INTO [dbo].[ACCOUNT_SELLER_PRIORITY] ([ACCOUNTID] ,[SELLERID] ,[PRIO] ,[IDX]) VALUES (?,?,?,?)", (int(users[row]), int(seller_rating_matrix[0][idx]), float(rate), idx))
                idx = idx + 1  
                if(idx > 1000):
                    break
            conn.commit()
    
if __name__=="__main__":
    print(1)