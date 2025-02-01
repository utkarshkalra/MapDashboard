import { BASE_URL } from "./Urls";

import axios from "axios";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const token = JSON.parse(localStorage.getItem("loginData")).token;

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
