import pyodbc 
import numpy as np
import pandas as pd
import nltk
from nltk.stem import PorterStemmer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
import pickle
from scipy.sparse import csr_matrix


ps = PorterStemmer()

def ParseProduct(rating):
    d = dict()
    d["ID_NK"] = rating[0]
    d["Name"] = rating[1]
    d["ShortDescription"] = rating[2]
    d["Description"] = rating[3]
    d["OriginalPrice"] = rating[4]
    d["RatingAverage"] = rating[5]
    d["RatingCount"] = rating[6]
    d["selName"] = rating[17]
    d["selRvCount"] = rating[18]
    d["selRating"] = rating[19]
    d["selFlow"] = rating[20]
    d["BrandName"] = rating[21]
    return d

def remove_space(L):
    L1 = []
    for i in L:
        L1.append(i.replace(" ",""))
    return L1

def fetch_array(text):
    L = []
    L.append(text)
    return L

def stems(text):
    T = []
    
    for i in text.split():
        T.append(ps.stem(i))
    
    return " ".join(T)

def fetch_products_by_cate(cate):
    conn_str = 'DRIVER=ODBC Driver 17 for SQL Server; Server=localhost; Database=ShopRecommend; Trusted_Connection=yes;'
# Kết nối đến SQL Server
    conn = pyodbc.connect(conn_str)
    cursor = conn.cursor()
    cursor.execute("SELECT p.[ID_NK],p.[Name] ,p.[ShortDescription] ,p.[Description] ,p.[OriginalPrice],p.[RatingAverage],p.[RatingCount] ,p.[BrandID_NK] ,p.[Category_LV0_NK] ,p.[Category_LV1_NK]"
                +"      ,p.[Category_LV2_NK],p.[Category_LV3_NK],p.[SellerID_NK],p.[ShortUrl] ,p.[Category_LV4_NK] ,p.[Category_LV5_NK] ,p.[Category_LV6_NK],"
                +"s.Name as selName, s.ReviewCount as selRvCount, "
                +"s.AvgRatingPoint as selRating, s.TotalFollower as selFlow, b.Name as BrandName from Product p "
                +"left join Brands b on p.BrandID_NK = b.ID_NK "
                +"left join Seller s on p.SellerID_NK = s.ID_NK "
                +f"where p.[Category_LV0_NK] = {cate}")
    result = cursor.fetchall()
    df = []
    for rating in result:
        df.append(ParseProduct(rating))
    df = pd.DataFrame(df)

    df.to_csv(f"Product_cate_{cate}.csv", mode='w', index=False)
    conn.close()

def training(cate):

    try:
        products = pd.read_csv(f"Product_cate_{cate}.csv")
    
        products.dropna(inplace=True)

        products['selName'] = products['selName'].apply(fetch_array)
        products['BrandName'] = products['BrandName'].apply(fetch_array)
        products['selName'] = products['selName'].apply(remove_space)
        products['BrandName'] = products['BrandName'].apply(remove_space)
        products['TagName'] = products['Name'].apply(lambda x:x.split())

        products['tags'] =  products['selName'] + products['BrandName'] + products['TagName']

        new_df = products[['ID_NK','Name','tags']]
        new_df['tags'] = new_df['tags'].apply(lambda x: " ".join(x))
        new_df['tags'] = new_df['tags'].apply(lambda x:x.lower())
        new_df['tags'] = new_df['tags'].apply(stems)
        ps = PorterStemmer()

        with open('vietnamese.txt', 'r', encoding='utf-8') as f:
            vietnamese_stopwords = f.read().splitlines()
        cv = CountVectorizer(max_features=5000,stop_words=vietnamese_stopwords)
        vector = cv.fit_transform(new_df['tags']).toarray()
        len(cv.get_feature_names_out())
        similarity = cosine_similarity(vector)
        with open(f'artifacts/movie_list_cate_{cate}.pkl', 'wb') as file:
            pickle.dump(new_df, file)
        with open(f'artifacts/similarity_cate_{cate}.pkl', 'wb') as file:
            pickle.dump(similarity, file)
        return True
    except:
        with open(f'artifacts/movie_list_cate_{cate}.pkl', 'wb') as file:
            print("tao file")
        return False

def recommend(productid, new_df, similarity):
    try:
        new_df = new_df.reset_index(drop=True)

        index = new_df[new_df['ID_NK'] == productid].index.tolist()
        distances = sorted(list(enumerate(similarity[index[0]])),reverse=True,key = lambda x: x[1])
        result = []
        for i in distances[1:10]:
            result.append(new_df.iloc[i[0]].ID_NK)
        return result
    except:
        return []

if __name__=="__main__":
    print(1)
# def recommend(productid):
#     index = new_df[new_df['ID_NK'] == productid].index[0]
#     print(new_df.iloc[index])
#     distances = sorted(list(enumerate(similarity[index])),reverse=True,key = lambda x: x[1])
#     for i in distances[1:10]:
#         print(new_df.iloc[i[0]].Name)