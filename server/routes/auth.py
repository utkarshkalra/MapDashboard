from fastapi import APIRouter, HTTPException, Response
from models.Login import LoginRequest
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt
from configurations import Settings


router = APIRouter()
 
pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")
ADMIN_USER = {
    "username": Settings().ADMIN_USER,
    "hashed_password": pwd_context.hash(Settings().ADMIN_PASSWORD)  # In production, use strong password
}
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=Settings().ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, Settings().SECRET_KEY, algorithm=Settings().ALGORITHM)
    return encoded_jwt

#login endpoint
# curl -X POST "http://localhost:8000/token" \
#      -H "Content-Type: application/json" \
#      -d '{
#          "username": "admin",
#          "password": "admin123"
#      }'
@router.post("/token")
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



