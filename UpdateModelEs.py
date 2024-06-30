from elasticsearch import Elasticsearch
import Environments as env
import pickle
import pandas as pd
import numpy as np
from fastapi import WebSocket

# Elasticsearch configuration with authentication credentials
es = Elasticsearch(
    cloud_id=env.ES_CLOUD_ID,
    basic_auth=(env.ES_USER, env.ES_PWD)
)

conn_str = env.CONN_STR


async def PushData(websocket: WebSocket):
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
    print(final_predictions.shape)
    df_reset = final_predictions.reset_index()
    df_long = pd.melt(df_reset, id_vars='user', var_name='seller', value_name='rating')
    quantiles = df_long.groupby('user')['rating'].quantile(0.75).reset_index()
    print(quantiles.shape)
    id = 0
    new_value = 0
    old_value = 0
    total = len(final_predictions)
    for row in range(0, len(final_predictions)):
        idx = 0
        seller_rating_matrix = np.vstack([sellers, final_predictions.iloc[row]])
        sorted_indices = np.argsort(seller_rating_matrix[1])
        sorted_matrix = seller_rating_matrix[:, sorted_indices]
        for rate in sorted_matrix[1]:
            print(rate)
            doc_id = id
            process_row(doc_id, int(users[row]), int(seller_rating_matrix[0][idx]), float(rate), idx)
            idx = idx + 1 
            id = id + 1
            print(id)
            
            if float(rate) < quantiles[quantiles['user'] == int(users[row])]['rating'].values[0]:
                break
        if (int(new_value / total * 100) != old_value):
            old_value = new_value
            new_value = new_value + 1
            await websocket.send_text(new_value)
if __name__ == '__main__':
    print(1)




