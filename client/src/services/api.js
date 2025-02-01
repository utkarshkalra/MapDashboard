import { BASE_URL } from "./Urls";

import axios from "axios";

export const api = axios.create({
  baseURL: BASE_URL,
});
