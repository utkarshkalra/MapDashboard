from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict

from routes.auth import router as auth_router
from routes.api import router as api_router

# Initializing FastAPI app
app = FastAPI(
    title="Cluster API",
    description="API for managing clusters",
    version="1.0.0"
)

# CORS configuration
# allow all origins
origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# Main router
router = APIRouter()

@router.get("/", response_model=Dict[str, str])
async def home() -> Dict[str, str]:
    """Root endpoint returning welcome message"""
    return {"message": "Welcome to the Cluster API"}

# Include routers with their prefixes
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(api_router, prefix="/api", tags=["API"])
app.include_router(router, tags=["Root"])

