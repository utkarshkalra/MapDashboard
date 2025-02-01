import random
import json

# # Approximate boundaries of India
# #approximate boundaries of madhya pradesh
# INDIA_BOUNDS = {
#     'lat_min': 20.4192,    # Southernmost point
#     'lat_max': 26.845,   # Northernmost point
#     'lng_min': 75.7906,   # Westernmost point
#     'lng_max': 81.8731,  # Easternmost point
# }

# # Function to generate dummy cluster data
# def generate_cluster_data(index):
#     return {
#         "_id": f"c{index}",
#         "name": f"Cluster {index}",
#         "location": {
#             "latitude": round(random.uniform(INDIA_BOUNDS['lat_min'], INDIA_BOUNDS['lat_max']), 4),
#             "longitude": round(random.uniform(INDIA_BOUNDS['lng_min'], INDIA_BOUNDS['lng_max']), 4)
#         },
#         "users": random.randint(50, 500),
#         "projects": random.randint(5, 50),
#         "leads": random.randint(20, 100)
#     }

# # Generate 100 clusters
# clusters = []
# for i in range(100):
#     clusters.append(generate_cluster_data(i))
# # Write the clusters data to a JSON file
# with open('clusters.json', 'w') as f:
#     # json.dump(clusters, f, indent=2)

clusters = []

#open clusters.json and sum up the users, projects, leads and avg user per cluster
with open('clusters.json', 'r') as f:
    clusters = json.load(f)
    total_users = sum(cluster['users'] for cluster in clusters)
    total_projects = sum(cluster['projects'] for cluster in clusters)
    total_leads = sum(cluster['leads'] for cluster in clusters)
    avg_users_per_cluster = total_users / len(clusters)
    print(f"Total users: {total_users}")
    print(f"Total projects: {total_projects}")
    print(f"Total leads: {total_leads}")
    print(f"Average users per cluster: {avg_users_per_cluster}")
