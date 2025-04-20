const AuthService = {
  accessTokenKey: "access",
  refreshTokenKey: "refresh",

  setTokens: (accessToken: string, refreshToken?: string | null) => {
    localStorage.setItem(AuthService.accessTokenKey, accessToken);
    if (refreshToken) {
      localStorage.setItem(AuthService.refreshTokenKey, refreshToken);
    }
  },

  getToken: (key: string) => localStorage.getItem(key),

  deleteToken: (key: string) => localStorage.removeItem(key),
};

export default AuthService;
