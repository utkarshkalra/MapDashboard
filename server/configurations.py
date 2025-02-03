from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pydantic_settings import BaseSettings

from typing import Optional

clusters = []
metrics = []



class Settings(BaseSettings):
    # database configurations
    DATABASE_URL: Optional[str] = None
    ADMIN_USER: Optional[str] = None
    ADMIN_PASSWORD: Optional[str] = None
    SECRET_KEY: Optional[str] = None
    ALGORITHM: Optional[str] = None
    ACCESS_TOKEN_EXPIRE_MINUTES: Optional[int] = None

    class Config:
        env_file = ".env"
        from_attributes = True


try:
    print("Connecting to MongoDB...", Settings().DATABASE_URL)
    client = MongoClient(Settings().DATABASE_URL, server_api=ServerApi('1'))
    # Sending a ping to confirm a successful connection
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
    db  =  client.analytics_dashboard
    clusters  =  db["clusters"]
    metrics  =  db["metrics"]
except Exception as e:
    print(e)
 