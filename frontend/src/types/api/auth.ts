export interface RefreshToken {
  refresh: string;
}
export interface AuthTokens extends RefreshToken {
  access: string;
}

export interface ResetPasswordToken {
  token: string;
}
