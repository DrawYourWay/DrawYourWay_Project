import AuthService from "@/services/TokenService";
import { useMutation } from "@tanstack/react-query";
import {
  changePassword,
  login,
  logOut,
  register,
  resetPassword,
  verify,
} from "../api/auth";

export const useLogin = () =>
  useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      const tokens = await login(username, password);
      AuthService.setTokens(tokens.access, tokens.refresh);
    },
  });

export const useRegister = (
  email: string,
  login: string,
  password: string,
  password_confirm: string
) =>
  useMutation({
    mutationFn: async () => {
      const tokens = await register(email, login, password, password_confirm);
      AuthService.setTokens(tokens.access, tokens.refresh);
    },
  });

export const useVerify = () =>
  useMutation({
    mutationFn: async () => {
      const accessToken = AuthService.getToken(AuthService.accessTokenKey);
      if (!accessToken) {
        throw new Error("No refresh token found");
      }
      await verify(accessToken);
    },
  });

export const useLogout = () =>
  useMutation({
    mutationFn: async () => {
      await logOut();
      AuthService.deleteToken(AuthService.accessTokenKey);
      AuthService.deleteToken(AuthService.refreshTokenKey);
    },
  });

export const usePasswordReset = (email: string) => {
  useMutation({
    mutationFn: async () => {
      const { token } = await resetPassword(email);
      return token;
    },
  });
};

export const useChangePassword = (
  email: string,
  token: string,
  password: string,
  password2: string
) =>
  useMutation({
    mutationFn: async () => {
      const success = await changePassword(email, token, password, password2);
      return success;
    },
  });
