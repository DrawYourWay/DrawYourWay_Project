import { client } from "./client";
import { AuthTokens, ResetPasswordToken } from "../types/api/auth";

export const login = (
  username: string,
  password: string
): Promise<AuthTokens> =>
  client
    .post("/auth/login/", {
      username,
      password,
    })
    .then((response) => response.data);

export const register = (
  email: string,
  username: string,
  password: string,
  password_confirm: string
): Promise<AuthTokens> =>
  client
    .post("/auth/register/", {
      email,
      username,
      password,
      password_confirm,
    })
    .then((response) => response.data);

export const logOut = () =>
  client.post("/auth/logout/", {}).then((response) => response.data);

export const verify = (token: string) =>
  client.post("/auth/verify/", { token }).then((response) => response.data);

export const resetPassword = (email: string): Promise<ResetPasswordToken> =>
  client
    .post("/auth/reset-password/", { email })
    .then((response) => response.data);

export const changePassword = (
  email: string,
  token: string,
  password: string,
  password2: string
) =>
  client
    .post("/auth/new-password/", {
      token,
      email,
      password,
      password2,
    })
    .then((response) => response.data);
