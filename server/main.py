from fastapi import FastAPI, APIRouter, HTTPException
from configurations import clusters, metrics
from database.schemas import all_clusters, get_metrics_data
from models.cluster import Cluster, Location
from models.metrics import Metrics
from fastapi.middleware.cors import CORSMiddleware
import uuid

app = FastAPI()
# allow cors  
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
router = APIRouter()
 
@router.get("/")
async def home():
    return {"message": "Welcome to the Cluster API"}
 
@router.get("/api/data")
async def get_all_clusters():
    data = clusters.find()
    return all_clusters(data)
 
@router.post("/api/cluster")   
async def create_cluster(new_task: Cluster):
    try:
        new_task.id = str(uuid.uuid4())
        # Convert the Cluster object to a dict and handle Location object separately
        cluster_dict = dict(new_task)
        cluster_dict['location'] = {
            'latitude': new_task.location.latitude,
            'longitude': new_task.location.longitude
        }
        resp = clusters.insert_one(cluster_dict)
        return {"status_code": 200, "id": str(resp.inserted_id)}
    except Exception as e:
        return HTTPException(status_code=500, detail=f"Some error occurred {e}")


@router.get("/api/metrics")
async def get_metrics():
    data = metrics.find()
    print(data)
    return get_metrics_data(data)


app.include_router(router)