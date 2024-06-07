from typing import Union
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, WebSocket
from typing import Optional
import os
import pyodbc 
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse import csr_matrix
import asyncio
import ContentBased as cb
import uvicorn
import pickle


app = FastAPI()

# run App: uvicorn main:app --reload
# host: http://127.0.0.1:8000/docs
# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with the appropriate origins if needed
    allow_methods=["*"],  # Or specify the allowed HTTP methods
    allow_headers=["*"],  # Or specify the allowed headers
)

def write_rating_to_csv():
    def ParseRating(rating):
        d = dict()
        d["SELLERID"] = rating[0]
        d["ACCOUNTID"] = rating[1]
        d["RATING"] = rating[2]
        return d

    # Thiết lập chuỗi kết nối
    conn_str = 'DRIVER=ODBC Driver 17 for SQL Server; Server=localhost; Database=ShopRecommend; Trusted_Connection=yes;'
    # Kết nối đến SQL Server
    conn = pyodbc.connect(conn_str)
    cursor = conn.cursor()

    # lấy dữ liệu Rating

    cursor.execute("SELECT [ACCOUNTID] ,[SELLERID] ,[RATING] FROM [ShopRecommend].[dbo].[AVG_RATING]")
    result = cursor.fetchall()
    df = []
    for rating in result:
        df.append(ParseRating(rating))
    df = pd.DataFrame(df)

    df.to_csv("RatingCustomerWithSeller.csv", mode='w')
    #đóng chuỗi kết nối
    conn.commit()
    conn.close()

def read_rating_matrix():
    df = pd.read_csv("RatingCustomerWithSeller.csv")
    df = df.drop(df.columns[0], axis=1)
    x  = df['ACCOUNTID'].value_counts() > 10
    y = x[x].index
    df = df[df['ACCOUNTID'].isin(y)]
    rating_pivot = df.pivot_table(columns='SELLERID', index='ACCOUNTID', values='RATING')
    rating_pivot.fillna(-1, inplace=True)
    return rating_pivot

def read_similarity_matrix():
    df = pd.read_csv("similarity.csv")
    return df

def write_similarity_matrix():
    rating_pivot = read_rating_matrix()
    rating_sparse = csr_matrix(rating_pivot)

    similarity =  cosine_similarity(rating_sparse)
    df_similarity = pd.DataFrame(similarity)
    df_similarity.to_csv('similarity.csv', index=False)

def get__UserAvgRating(user):
        # Thiết lập chuỗi kết nối
    conn_str = 'DRIVER=ODBC Driver 17 for SQL Server; Server=localhost; Database=ShopRecommend; Trusted_Connection=yes;'
    # Kết nối đến SQL Server
    conn = pyodbc.connect(conn_str)
    cursor = conn.cursor()
    cursor.execute("SELECT [RATING] FROM [dbo].[ACCOUNT_AVG_RATING] WHERE [ACCOUNTID] = ?", user)
    result = cursor.fetchone()
    conn.close()
    return result[0]

async def fake_training_process(websocket: WebSocket):
    rating_pivot = read_rating_matrix()
    similarity_matrix = read_similarity_matrix()
    conn_str = 'DRIVER=ODBC Driver 17 for SQL Server; Server=localhost; Database=ShopRecommend; Trusted_Connection=yes;'
    conn = pyodbc.connect(conn_str)
    cursor = conn.cursor()

    cursor.execute("truncate table [dbo].[ACCOUNT_SELLER_PRIORITY]")
    num_users = len(rating_pivot.index)
    oldvalue = 0

    # todo
    for idx, user in enumerate(rating_pivot.index.tolist()):
        user_index = rating_pivot.index.get_loc(user)

        user_ratings = rating_pivot.iloc[user_index] # mảng 1 chiều, rating của user với các item
        user_similarity = similarity_matrix.iloc[user_index]

        avg_rating = get__UserAvgRating(user)
        
        for i in range(0, rating_pivot.shape[1]):
            neighbor_rating_matrix = rating_pivot.iloc[:,i]
            neighbor_rating_matrix = np.array(neighbor_rating_matrix)
            similarity_arr = np.array(user_similarity)
            mask = neighbor_rating_matrix != -1
            avg = np.average(neighbor_rating_matrix[mask] * similarity_arr[mask])
            user_ratings.iloc[i] = avg + avg_rating
        user_ratings = user_ratings.reset_index()
        user_ratings.columns = ['sellerid', 'rating']
        user_ratings = user_ratings.sort_values(by='rating', ascending=False)
        i = 0
        for index, row in user_ratings.iterrows():   
            cursor.execute(f"INSERT INTO [dbo].[ACCOUNT_SELLER_PRIORITY] ([ACCOUNTID] ,[SELLERID] ,[PRIO] ,[IDX]) VALUES (?,?,?,?)", (user, int(row['sellerid']), row['rating'], i))
            i = i + 1
        conn.commit()

                # Update progress every 1%
        progress = int((idx + 1) / num_users * 100)
        if progress % 1 == 0 and progress != oldvalue:
            await websocket.send_text(f"Training progress: {progress}%")
            oldvalue = progress
    # end todo
    conn.close()

async def write_rating_to_csv_process(websocket: WebSocket):
    write_rating_to_csv()
    await websocket.send_text(f"Kết thúc ghi file rating")

async def write_similarity_matrix_process(websocket: WebSocket):
    write_similarity_matrix()
    await websocket.send_text(f"Kết thúc ghi file similarity")



@app.websocket("/ws/offline")
async def train_data_offline(websocket: WebSocket):
    await websocket.accept()
    await websocket.send_text(f"Bắt đầu ghi file rating")
    await write_rating_to_csv_process(websocket)
    await websocket.send_text(f"Bắt đầu ghi file Similarity")
    await write_similarity_matrix_process(websocket)
    await websocket.send_text(f"Bắt đầu training")
    await fake_training_process(websocket)
    await websocket.send_text(f"Kết thúc training")
    await websocket.close()

cate = [1103, 1104, 1105, 1106, 1107, 1108, 1109, 1110, 1111, 1112, 1113, 1114, 1115, 1116, 1117, 1118, 1119, 1120, 1121, 1122, 1123, 1124, 1125, 1126, 1127] 

movies = {}
similarites = {}
for i in cate:
    movies[i] = pickle.load(open(f'artifacts/movie_list_cate_{i}.pkl','rb'))
    similarites[i] = pickle.load(open(f'artifacts/similarity_cate_{i}.pkl','rb'))


@app.websocket("/ws/TraingProduct")
async def TraingProduct(websocket: WebSocket):
    await websocket.accept()
    await websocket.send_text(f"Bắt đầu training product")
    for i in cate:
        print(i)
        await websocket.send_text(f"{cate.index(i) / len(cate) * 100}%")
        check = cb.fetch_products_by_cate(i)
        if check == False:
            
            continue
        cb.training(i)
    await websocket.send_text(f"Kết thúc training")
    await websocket.close()

@app.get("/get/RecommendProduct")
def RecommendProduct(productId: int, cateid: int):
    movie = []
    similarity = []
    if(cateid in cate):
        movie = movies[cateid]
        similarity = similarites[cateid]
    result = []
    if len(movie) > 0 and len(similarity > 0):
        result = cb.recommend(productId, movie, similarity)
        result = [int(x) for x in result]

    return {
        "total": len(result),
        "products": result
    }
if __name__ == '__main__':
    uvicorn.run(app, port=8888, host='localhost')
