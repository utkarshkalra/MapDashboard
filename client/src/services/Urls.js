const BASE_URL = import.meta.env.VITE_BASE_URL;

const GET_ALL_CLUSTERS_ENDPOINT = "/api/data";
const SAVE_CLUSTERS_ENDPOINT = "/api/cluster";
const GET_METRICS_ENDPOINT = "/api/metrics";
const LOGIN_ENDPOINT = "/auth/token";

export {
  BASE_URL,
  GET_ALL_CLUSTERS_ENDPOINT,
  SAVE_CLUSTERS_ENDPOINT,
  GET_METRICS_ENDPOINT,
  LOGIN_ENDPOINT,
};
