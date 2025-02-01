from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
PASSWORD = "cakerusk50"
uri = "mongodb+srv://utkarshkalra2001:{0}@analytics-dashboard.l6n7s.mongodb.net/?retryWrites=true&w=majority&appName=analytics-dashboard".format(PASSWORD)

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
clusters = []
metrics = []
# Send a ping to confirm a successful connection
try:
    print("Connecting to MongoDB...", uri)
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
    db  =  client.analytics_dashboard
    clusters  =  db["clusters"]
    metrics  =  db["metrics"]
except Exception as e:
    print(e)
 