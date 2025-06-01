import AuthService from "@/services/TokenService";
import { useMutation } from "@tanstack/react-query";
import {
  changePassword,
  login,
  logOut,
  refresh,
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

export const useRefresh = () =>
  useMutation({
    mutationFn: async () => {
      const refreshToken = AuthService.getToken(AuthService.refreshTokenKey);
      if (!refreshToken) {
        throw new Error("No refresh token found");
      }
      const { access } = await refresh(refreshToken);
      AuthService.setTokens(access, refreshToken);
    },
  });

export const useRegister = () =>
  useMutation({
    mutationFn: async ({
      email,
      login,
      password,
      password_confirm,
    }: {
      email: string;
      login: string;
      password: string;
      password_confirm: string;
    }) => await register(email, login, password, password_confirm),
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

export const usePasswordReset = () =>
  useMutation({
    mutationFn: async (email: string) => await resetPassword(email),
  });

export const useChangePassword = () =>
  useMutation({
    mutationFn: async ({
      email,
      token,
      password,
      password2,
    }: {
      email: string;
      token: string;
      password: string;
      password2: string;
    }) => await changePassword(email, token, password, password2),
  });
