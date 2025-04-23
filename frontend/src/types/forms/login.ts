import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required")
    .max(255, "Email must be less than 255 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(255, "Password must be less than 255 characters"),
});
