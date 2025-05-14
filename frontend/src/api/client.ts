import axios from "axios";
import AuthService from "@/services/TokenService";

export const client = axios.create({
  baseURL: "http://localhost:8000/api",
});

client.defaults.headers.common["Authorization"] =
  `Bearer ${AuthService.getToken(AuthService.accessTokenKey)}`;
