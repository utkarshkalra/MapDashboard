from pydantic import BaseModel

class Metrics(BaseModel):
    total_users: int
    total_projects: int
    total_leads: int
    total_clusters: int