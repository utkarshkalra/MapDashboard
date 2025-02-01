from pydantic import BaseModel

class Location(BaseModel):
    latitude: float
    longitude: float

class Cluster(BaseModel):
    id: str | None = None
    name: str
    location: Location
    users: int
    projects: int
    leads: int

