import AuthService from "@/services/TokenService";
import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

client.interceptors.request.use(
  (request) => {
    const token = AuthService.getToken(AuthService.accessTokenKey);
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
