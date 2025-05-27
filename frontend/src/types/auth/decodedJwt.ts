export type DecodedJwt = {
  exp: number;
  iat: number;
  is_superuser: boolean;
  token_type: string;
  user_id: number;
};
