import { z } from "zod";

export const LoginFormSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(255, "Username must be less than 255 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(255, "Password must be less than 255 characters"),
});
