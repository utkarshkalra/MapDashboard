import { api } from "./api";

const clusterService = {
  getClusters: async () => {
    const response = await api.get("/data");
    return response.data;
  },

  addCluster: async (clusterData) => {
    const response = await api.post("/cluster", clusterData);
    return response.data;
  },
};

export default clusterService;
