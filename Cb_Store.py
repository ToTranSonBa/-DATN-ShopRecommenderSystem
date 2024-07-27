import pyodbc 
import numpy as np
import pandas as pd
import nltk
from nltk.stem import PorterStemmer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
import pickle
from scipy.sparse import csr_matrix
import re
from unidecode import unidecode
import Environments as env

ps = PorterStemmer()

def clean_product_name(name):
    # Loại bỏ ký tự đặc biệt và chuyển đổi chữ thường
    clean_name = re.sub(r'[^a-zA-Z0-9\sàáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]', '', name).lower()
    return clean_name   

def ParseProduct(rating):
    d = dict()
    d["SELLERID"] = rating[0]
    d["ProductName"] = clean_product_name(rating[1])
    return d

def prepare_data():
    conn_str = env.CONN_STR
    # Kết nối đến SQL Server
    df = []
    with pyodbc.connect(conn_str) as conn:
        cursor = conn.cursor()
        cursor.execute("  select SellerID_NK, P.[Name] from Seller inner join Product p on Seller.ID_NK = p.SellerID_NK")
        result = cursor.fetchall()

        for rating in result:
            df.append(ParseProduct(rating))
        df = pd.DataFrame(df)
    return df
    

def stems(text):
    T = []
    
    for i in text.split():
        T.append(ps.stem(i))
    
    return " ".join(T)

def remove_space(L):
    L1 = []
    for i in L:
        L1.append(i.replace(" ",""))
    return L1

def handle_data():
    df = prepare_data()


    if(len(df) == 0):
        df = pd.DataFrame(columns=['SELLERID', 'ProductName'])
        with open(f'artifacts/cb_store.pkl', 'wb') as file:
            pickle.dump(df, file)
        with open(f'artifacts/cb_store_similarity.pkl', 'wb') as file:
            pickle.dump([], file)
        return

    df = df.groupby('SELLERID')['ProductName'].agg(' '.join).reset_index()
    df['ProductName'] = df['ProductName'].replace(" ", "")
    df['ProductName'] = df['ProductName'].apply(stems)

    with open('vietnamese.txt', 'r', encoding='utf-8') as f:
        vietnamese_stopwords = f.read().splitlines()
    cv = CountVectorizer(max_features=5000,stop_words=vietnamese_stopwords)
    vector = cv.fit_transform(df['ProductName']).toarray()

    similarity = cosine_similarity(vector)
    with open(f'artifacts/cb_store_similarity.pkl', 'wb') as file:
        pickle.dump(similarity, file)
    with open(f'artifacts/cb_store.pkl', 'wb') as file:
        pickle.dump(df, file)

def recommend(seller, new_df, similarity):
    try:
        new_df = new_df.reset_index(drop=True)

        index = new_df[new_df['SELLERID'] == seller].index.tolist()
        distances = sorted(list(enumerate(similarity[index[0]])),reverse=True,key = lambda x: x[1])
        result = []
        for i in distances[1:100]:
            result.append(int(new_df.iloc[i[0]].SELLERID))
        return result
    except:
        return []
if __name__=='__main__':
    print(1)