import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.neighbors import NearestNeighbors
import pyodbc 
import pickle
from sklearn.cluster import KMeans
import Environments as env
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
import time
import UpdateModelEs as es
import os
import json
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
    conn_str = env.CONN_STR

    # with pyodbc.connect(conn_str) as conn:
    #     cursor = conn.cursor()
    #     cursor.execute("Exec SetBehaviorRating")
    #     cursor.execute("Exec SellerAvg")
    #     cursor.execute("Exec SetAvgRating")
    #     conn.commit()
    behavior_df = []
    with pyodbc.connect(conn_str) as conn:
        cursor = conn.cursor()
        cursor.execute("select ACCOUNTID, SELLERID, B_RATING from ACOOUUNT_BEHAVIOR_RATING ")
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
        df_rate.loc[int(rate['user']), int(rate['sellerid'])] = round(float(rate['rating']))
    # Điền rating và matrix
    for idex, rate in behavior_df.iterrows():
        df_behavior.loc[int(rate['user']), int(rate['sellerid'])] = round(float(rate['behavior']))
    df_behavior.fillna(0)

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

def knn_with_weights_and_mf(user_rating_matrix, user_implicit_matrix, n_neighbors=5, n_clusters=10):
    global env
    # Train Matrix Factorization model (assuming MatrixFactorization class exists)
    mf = MatrixFactorization(user_rating_matrix.values, K=5, alpha=0.01, beta=0.01, iterations=40)
    mf.train()
    predicted_ratings = mf.full_matrix()
    print("xong mf")
    print(predicted_ratings.shape)
    # Compute user averages
    user_means = np.mean(predicted_ratings, axis=1, keepdims=True)
    user_means = pd.DataFrame(user_means, index=user_rating_matrix.index)
    # Apply K-means clustering
    user_kmeans = KMeans(n_clusters=n_clusters, random_state=0)
    user_clusters = user_kmeans.fit_predict(predicted_ratings)
    print("xong trung bình")

    total = predicted_ratings.shape[0] * predicted_ratings.shape[1]
    newvalue = 0
    oldvalue = 0
    # Initialize final predictions DataFrame
    print("xong similarity")

    final_predictions = pd.DataFrame(np.zeros_like(predicted_ratings), columns=user_rating_matrix.columns, index=user_rating_matrix.index)
    predicted_ratings = pd.DataFrame(predicted_ratings, columns=user_rating_matrix.columns, index=user_rating_matrix.index)
    # Loop through each cluster
    for cluster_id in range(0, n_clusters):
        # Select users belonging to the current cluster

        cluster_users = np.where(user_clusters == cluster_id)[0]
        print(f"cluster length: {len(cluster_users)}")

        if len(cluster_users) < n_neighbors:
            final_predictions.iloc[cluster_users] = predicted_ratings.iloc[cluster_users]
            continue
        # Select corresponding predicted ratings and implicit matrix
        cluster_predicted_ratings = predicted_ratings.iloc[cluster_users]
        cluster_user_matrix = user_rating_matrix.iloc[cluster_users]
        cluster_implicit_matrix = user_implicit_matrix.iloc[cluster_users]
        # Compute cosine similarity within the cluster
        cluster_similarity1 = cosine_similarity(cluster_predicted_ratings)
        cluster_similarity2 = cosine_similarity(cluster_implicit_matrix)
        cluster_similarity = (cluster_similarity1 + cluster_similarity2) / 2.0

        # giải phóng những biên không cần
        cluster_similarity1 = None
        cluster_similarity2 = None
        cluster_implicit_matrix = None
        cluster_predicted_ratings = None

        df_cluster_similarity = pd.DataFrame(cluster_similarity, columns=cluster_user_matrix.index.tolist(), index=cluster_user_matrix.index.tolist())   
        user_ids = cluster_user_matrix.index
        item_ids = cluster_user_matrix.columns    
        i = 0
        total = len(user_ids)
        oldvalue = 0
        for user_id in user_ids:
            similar_users = df_cluster_similarity.loc[user_id].sort_values(ascending=False)
            user_mean = user_means.loc[user_id, 0]
            # print(similar_users)
            Neighborhood_similarity = similar_users.head(5)
            for column in item_ids:
                if cluster_user_matrix.loc[user_id, column] == 0: # Chỉ xét các item mà user chưa đánh giá
                    total_score = 0
                    similarity_sum = 0
                    for other_user in Neighborhood_similarity.index.tolist():
                        if other_user == user_id:
                            continue
                        total_score +=  (predicted_ratings.loc[other_user, column] - user_means.loc[other_user][0])* similar_users[other_user]
                        similarity_sum += similar_users[other_user]
                    final_predictions.loc[user_id, column] = user_mean + total_score / similarity_sum
                else:
                    final_predictions.loc[user_id, column] = predicted_ratings.loc[user_id, column]
                # print(f"{cluster_id} -- Similarity: {len(similar_users)}----- {cluster_user_matrix.shape} -------- {user_id} ---- {column}")                
                if env.training_cancel == 1:
                    raise
                newvalue = newvalue + 1
                if env.training_cancel == 1:
                    raise
                persent = int((newvalue) / total * 100)
                # print(persent)
                if (persent > oldvalue):
                    oldvalue = persent
                    env.training_status = persent
            i = i + 1
            if (int(i % total * 100) > oldvalue):
                oldvalue = int(i % total * 100)
                print(oldvalue)
    return final_predictions


def recommend(user_id, final_predictions, top_n=100):
    # Sort predicted ratings for the user and get top n recommendations
    predicted_ratings = final_predictions.loc[user_id].sort_values(ascending=False)
    top_ratings = predicted_ratings
    rating_list = [{'seller_id': seller, 'rating': rating} for seller, rating in top_ratings.items()]
    return rating_list

def train():
    global env
    env.training_phase = 1
    with pyodbc.connect(env.CONN_STR) as conn:
        cursor = conn.cursor()
        cursor.execute("delete from TRAIN_LOG where TRAIN_LOG.algorithm = 1")
        cursor.execute(f"insert TRAIN_LOG (algorithm, phase, phasename, AD_DATE) values(1, 1, N'Chuẩn bị dữ liệu', SYSDATETIME())")
        cursor.commit()
    df_rate, df_behavior = prepare_data()
    env.training_phase = 2
    df_rate.fillna(0)

    print("prepare data success")
    if env.training_cancel == 1:
        raise
    with pyodbc.connect(env.CONN_STR) as conn:
        cursor = conn.cursor()
        cursor.execute(f"insert TRAIN_LOG (algorithm, phase, phasename, AD_DATE) values(1, 2, N'Huấn luyện dữ liệu', SYSDATETIME())")
        cursor.commit()
    final_predictions = knn_with_weights_and_mf(df_rate, df_behavior)
    with open('artifacts/final_predictions.pkl', 'wb') as f:
        pickle.dump(final_predictions, f)
    print("xong")
    # es.PushData()

def write_model_to_db():
    conn_str = env.CONN_STR
    users = pickle.load(open(f'artifacts/Knn_List_User.pkl','rb'))
    sellers = pickle.load(open(f'artifacts/Knn_List_Seller.pkl','rb'))
    final_predictions = pickle.load(open(f'artifacts/final_predictions.pkl','rb'))

    df_reset = final_predictions.reset_index()
    df_long = pd.melt(df_reset, id_vars='user', var_name='seller', value_name='rating')
    quantiles = df_long.groupby('user')['rating'].quantile(0.75).reset_index()
    
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
                if(float(rate) < quantiles[quantiles['user'] == int(users[row])]['rating'].values[0]):
                    break
            conn.commit()
    
if __name__=="__main__":
    # print(1)
    train()