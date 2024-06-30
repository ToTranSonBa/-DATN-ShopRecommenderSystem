from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, WebSocket
import ContentBased as cb
import uvicorn
import pickle
import NeighborhoodBased as nb
import UpdateModelEs as up
import Environments as env

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

async def Knn_train(websocket: WebSocket):
    nb.train()
    await websocket.send_text(f"Kết thúc train")

async def prepare_data_async(websocket: WebSocket):
    nb.prepare_data()
    await websocket.send_text(f"Chuẩn bị data xong")

@app.websocket("/ws/offline")
async def train_data_offline(websocket: WebSocket):
    await websocket.accept()
    await websocket.send_text(f"Chuẩn bị dữ liệu")
    await prepare_data_async(websocket)
    await websocket.send_text(f"Train")
    await Knn_train(websocket)
    await websocket.send_text(f"Kết thúc training")
    await websocket.close()

cate = env.CONTENT_BASED_CLUSTER
movies = {}
similarites = {}
for i in cate:
    movies[i] = pickle.load(open(f'artifacts/movie_list_cate_{i}.pkl','rb'))
    similarites[i] = pickle.load(open(f'artifacts/similarity_cate_{i}.pkl','rb'))

def load_cb():
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
        cb.fetch_products_by_cate(i)
        cb.training(i)
    await websocket.send_text(f"Kết thúc training")
    await websocket.close()
    load_cb()
    print('load lai model')

@app.get("/get/RecommendProduct")
async def RecommendProduct(userid: int, productId: int, cateid: int):
    movie = []
    similarity = []
    if(cateid in cate):
        movie = movies[cateid]
        similarity = similarites[cateid]

    result = []
    if len(movie) > 0 and len(similarity > 0):
        result = await cb.recommend(productId, movie, similarity)
        result = [int(x) for x in result]
    print(result)
    if userid != 0:
        cb.write_recommend(userid, cateid, result)
    
    return {
        "total": len(result),
        "products": result
    }

@app.get("/get/RecommendProductForUser")
def RecommendProduct(userid: int):
    user_log = cb.get_recommend_for_user(userid)
    results = []        
    for cateid, productId  in user_log:
        movie = []
        similarity = []
        if(cateid in cate):
            movie = movies[cateid]
            similarity = similarites[cateid]

        if len(movie) > 0 and len(similarity > 0):
            print(len(movie))
            result = cb.recommend(productId, movie, similarity, 5)
            print(len(result))
            results.extend(result)
    results = [int(x) for x in results]
    results = list(set(results))
    return {
        "total": len(results),
        "products": results
    }

@app.websocket("/ws/update-es")
async def UpdateEs(websocket: WebSocket):
    await websocket.accept()
    await websocket.send_text(0)
    await up.PushData(websocket)
    await websocket.close()

if __name__ == '__main__':
    load_cb()
    uvicorn.run(app, port=env.FASTAPI_HOST, host=env.FASTAPI_HOST)
