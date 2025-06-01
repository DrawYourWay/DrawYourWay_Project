export interface AccessToken {
  access: string;
}
export interface RefreshToken {
  refresh: string;
}
export interface AuthTokens extends RefreshToken, AccessToken {}

export interface ResetPasswordToken {
  token: string;
}
