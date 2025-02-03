import { api } from "./api";
import { GET_ALL_CLUSTERS_ENDPOINT, SAVE_CLUSTERS_ENDPOINT } from "./Urls";

const clusterService = {
  getClusters: async () => {
    const response = await api.get(GET_ALL_CLUSTERS_ENDPOINT);
    return response.data;
  },

  addCluster: async (clusterData) => {
    const response = await api.post(SAVE_CLUSTERS_ENDPOINT, clusterData);
    return response.data;
  },
};

export default clusterService;
