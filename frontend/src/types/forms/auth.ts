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

export const RegisterFormSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required")
      .max(255, "Email must be less than 255 characters"),
    username: z
      .string()
      .min(1, "Username is required")
      .max(255, "Username must be less than 255 characters"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    password2: z.string().min(6, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords don't match",
    path: ["password2"],
  });
