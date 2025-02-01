from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header, Response
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from configurations import clusters, metrics
from database.schemas import all_clusters, get_metrics_data
from models.cluster import Cluster, Location
from models.metrics import Metrics
from fastapi.middleware.cors import CORSMiddleware
import uuid
from typing import Optional
from fastapi import Cookie
from pydantic import BaseModel

app = FastAPI()
# Update CORS settings to be more specific and secure
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Must be specific origin
    allow_credentials=True,  # Important for cookies
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)
router = APIRouter()
 
@router.get("/api")
async def home():
    return {"message": "Welcome to the Cluster API"}

# Example curl command for getting all clusters
"""
curl "http://localhost:8000/api/data"
"""

@router.get("/api/data")
async def get_all_clusters():
    data = clusters.find()
    return all_clusters(data)
 
# Security configurations
SECRET_KEY = "your-secret-key-here"  # In production, use environment variable
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Mock admin user - In production, store in database
ADMIN_USER = {
    "username": "admin",
    "hashed_password": pwd_context.hash("admin123")  # In production, use strong password
}

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    token = authorization.split(" ")[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
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


# Add this login model
class LoginRequest(BaseModel):
    username: str
    password: str

#login endpoint
# curl -X POST "http://localhost:8000/token" \
#      -H "Content-Type: application/json" \
#      -d '{
#          "username": "admin",
#          "password": "admin123"
#      }'
@router.post("/api/token")
async def login(response: Response, login_data: LoginRequest):
    if login_data.username != ADMIN_USER["username"]:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    if not verify_password(login_data.password, ADMIN_USER["hashed_password"]):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    access_token = create_access_token(data={"sub": login_data.username})
    
    # Set the JWT token as an HTTP-only cookie
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,  # Makes cookie inaccessible to JavaScript
        secure=True,    # Only sends cookie over HTTPS
        samesite="lax", # Protects against CSRF
        max_age=1800    # 30 minutes in seconds
    )

    return {"username": login_data.username, "status": 200 , "token": access_token}


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

# only admin can create a cluster

@router.post("/api/cluster")   
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

@router.get("/api/metrics")
async def get_metrics():
    data = metrics.find()
    print(data)
    return get_metrics_data(data)


app.include_router(router)