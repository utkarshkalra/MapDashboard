from fastapi import APIRouter, HTTPException, Depends, Header
from models.cluster import Cluster
from models.metrics import Metrics
from configurations import clusters, metrics
from jose import jwt, JWTError
from typing import Optional 
from database.schemas import all_clusters, get_metrics_data
from configurations import Settings
import uuid

router = APIRouter()

async def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    token = authorization.split(" ")[1]
    try:
        payload = jwt.decode(token, Settings().SECRET_KEY, algorithms=[Settings().ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(
                status_code=401,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return username




# Example curl command for getting all clusters
"""
curl "http://localhost:8000/api/data"
"""

@router.get("/data")
async def get_all_clusters():
    data = clusters.find()
    return all_clusters(data)

# only admin can create a cluster
# Example curl command for creating a cluster (requires token from login)
"""
curl -X POST "http://localhost:8000/api/cluster" \
     -H "Authorization: Bearer <access_token>" \
     -H "Content-Type: application/json" \
     -d '{
         "name": "Test Cluster",
         "users": 10,
         "projects": 5,
         "leads": 2,
         "location": {
             "latitude": 12.34,
             "longitude": 56.78
         }
     }'
"""

@router.post("/cluster")   
async def create_cluster(
    new_task: Cluster,
    authorization: str = Header(...),  # Make authorization header required
    current_user: str = Depends(get_current_user)
):
    try:
        new_task.id = str(uuid.uuid4())
        cluster_dict = dict(new_task)
        cluster_dict['location'] = {
            'latitude': new_task.location.latitude,
            'longitude': new_task.location.longitude
        }
        resp = clusters.insert_one(cluster_dict)
        return {"status_code": 200, "id": str(resp.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Some error occurred {e}")

# Example curl command for getting metrics
"""
curl "http://localhost:8000/api/metrics"
"""

@router.get("/metrics")
async def get_metrics():
    data = metrics.find()
    print(data)
    return get_metrics_data(data)
