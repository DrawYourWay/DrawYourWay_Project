import AuthService from "@/services/TokenService";
import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

client.defaults.headers.common["Authorization"] =
  `Bearer ${AuthService.getToken(AuthService.accessTokenKey)}`;

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refresh = AuthService.getToken(AuthService.refreshTokenKey);

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh/`,
          {
            refresh,
          }
        );
        const { access } = response.data;
        AuthService.setTokens(access, refresh);
        client.defaults.headers.common["Authorization"] = `Bearer ${access}`;
        return client(originalRequest);
      } catch (refreshError) {
        AuthService.deleteToken(AuthService.accessTokenKey);
        AuthService.deleteToken(AuthService.refreshTokenKey);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
