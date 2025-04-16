import { client } from "./client";
import { AuthTokens, ResetPasswordToken } from "../types/api/auth";

export const login = (
  username: string,
  password: string
): Promise<AuthTokens> => {
  return client.post("/auth/login/", {
    username,
    password,
  });
};

export const register = (
  email: string,
  login: string,
  password: string,
  password_confirm: string
): Promise<AuthTokens> => {
  return client.post("/auth/register/", {
    email,
    login,
    password,
    password_confirm,
  });
};

export const logOut = () => {
  return client.post("/auth/logout/", {});
};

export const verify = (token: string) => {
  return client.post("/auth/verify/", { token });
};

export const resetPassword = (email: string): Promise<ResetPasswordToken> => {
  return client.post("/auth/reset-password/", { email });
};

export const newPassword = (
  email: string,
  token: string,
  password: string,
  password2: string
) => {
  return client.post("/auth/new-password/", {
    token,
    email,
    password,
    password2,
  });
};
