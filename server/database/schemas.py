def individual_cluster_data(cluster):
    return {
        "id": str(cluster["_id"]),
        "name": cluster["name"],
        "location": cluster["location"],
        "users": cluster["users"],
        "projects": cluster["projects"],
        "leads": cluster["leads"]
    }

def get_metric(metric):
    return {
        "total_users": metric["total_users"],
        "total_projects": metric["total_projects"],
        "total_leads": metric["total_leads"],
        "total_clusters": metric["total_clusters"]
    }

def all_clusters(clusters):
    return [individual_cluster_data(cluster) for cluster in clusters ]

def get_metrics_data(metrics):
    return [get_metric(metric) for metric in metrics]