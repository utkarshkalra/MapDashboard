import { api } from "./api";

const TOKEN_KEY = "token";
const USER_KEY = "user";

const authService = {
  login: async (credentials) => {
    const response = await api.post("/token", credentials);
    if (response.data.status === 200) {
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data.username));
      return response.data;
    }
    throw new Error("Login failed");
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  },

  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser: () => {
    return JSON.parse(localStorage.getItem(USER_KEY));
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};

export default authService;
