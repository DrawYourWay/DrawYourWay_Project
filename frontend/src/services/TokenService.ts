import { DecodedJwt } from "@/types/auth/decodedJwt";
import { jwtDecode } from "jwt-decode";

const AuthService = {
  accessTokenKey: "access",
  refreshTokenKey: "refresh",

  setTokens: (accessToken: string, refreshToken?: string | null) => {
    localStorage.setItem(AuthService.accessTokenKey, accessToken);
    if (refreshToken) {
      localStorage.setItem(AuthService.refreshTokenKey, refreshToken);
    }
  },

  isAdmin: () => {
    if (!AuthService.getToken(AuthService.accessTokenKey)) return false;
    const decodedJwt: DecodedJwt = jwtDecode(
      AuthService.getToken(AuthService.accessTokenKey)!
    );
    return decodedJwt.is_superuser;
  },

  getToken: (key: string) => localStorage.getItem(key),

  deleteToken: (key: string) => localStorage.removeItem(key),
};

export default AuthService;
