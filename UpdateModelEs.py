from elasticsearch import Elasticsearch
from concurrent.futures import ThreadPoolExecutor
from tqdm import tqdm
import Environments as env
import pickle
import pandas as pd
import numpy as np
from fastapi import FastAPI, WebSocket

ES_CLOUD_ID = "ShopRecommendES:YXNpYS1lYXN0MS5nY3AuZWxhc3RpYy1jbG91ZC5jb206NDQzJDUwY2ZiZDI1ZWU4MjRmNWFhNzJlY2NmMDk0MDU4YmM5JDgwY2EwOTI3YzZhMDRmNWI4M2FhZTUxN2Q1M2I1NTc0"
ES_USER = "elastic"
ES_PWD = "ANdFJFHrXJgmSsEj2Lxe70AE"

# Elasticsearch configuration with authentication credentials
es = Elasticsearch(
    cloud_id= ES_CLOUD_ID,
    basic_auth=(ES_USER, ES_PWD)
)

conn_str = env.CONN_STR

def PushData():
    global env
    env.training_status = 0
    env.training_phase = 3
    # Establish connection
    def process_row(doc_id, user, seller, rating, idx):
        row_dict = {
            'ACCOUNTID': user,
            'SELLERID': seller,
            'IDX': idx,
            'ID': doc_id  # Assuming you meant to use doc_id here
        }

        if es.exists(index='accselpri', id=doc_id):
            es.update(index='accselpri', id=doc_id, body={'doc': row_dict})
        else:
            es.index(index='accselpri', id=doc_id, body=row_dict)

    if(es.indices.exists(index='accselpri')):
        es.indices.delete(index='accselpri')

    mapping  = {
        "properties": {
            "ACCOUNTID": {
                "type": "long"
            },
            "ID": {
                "type": "long"
            },
            "IDX": {
                "type": "long"
            },
            "PRIO": {
                "type": "float"
            },
            "SELLERID": {
                "type": "long"
            },
            "accID": {
                "type": "integer",
                "fields": {
                    "keyword": {
                        "type": "keyword"
                    }
                }
            },
            "idx": {
                "type": "integer",
                "fields": {
                    "keyword": {
                        "type": "keyword"
                    }
                }
            },
            "sellerID": {
                "type": "integer",
                "fields": {
                    "keyword": {
                        "type": "keyword"
                    }
                }
            }
        }
    }

    es.indices.create(index='accselpri', body={"mappings": mapping})

    users = pickle.load(open('artifacts/Knn_List_User.pkl', 'rb'))
    sellers = pickle.load(open('artifacts/Knn_List_Seller.pkl', 'rb'))
    final_predictions = pickle.load(open('artifacts/final_predictions.pkl', 'rb'))
    df_reset = final_predictions.reset_index()
    df_long = pd.melt(df_reset, id_vars='user', var_name='seller', value_name='rating')
    quantiles = df_long.groupby('user')['rating'].quantile(0.75).reset_index()
    id = 0
    total = len(final_predictions)
    oldvalue = 0
    newvalue = 0
    for row in range(len(final_predictions)):
        idx = 0
        user_ratings = final_predictions.iloc[row].values
        sorted_indices = np.argsort(user_ratings)
        sorted_sellers = sellers[sorted_indices]
        sorted_ratings = user_ratings[sorted_indices]
        for seller, rate in zip(sorted_sellers, sorted_ratings):
            doc_id = id
            process_row(doc_id, int(users[row]), int(seller), float(rate), idx)
            idx = idx + 1 
            id = id + 1
            try:
                if float(rate) < quantiles[quantiles['user'] == int(users[row])]['rating'].values[0]:
                    break
            except:
                print(quantiles[quantiles['user'] == int(users[row])])
        newvalue = int((row/total)* 100)

        if(newvalue > oldvalue):
            oldvalue = newvalue
            print(newvalue)
            env.training_status = newvalue
            

if __name__=="__main__":
    print(1)