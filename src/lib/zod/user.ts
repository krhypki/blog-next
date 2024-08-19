import { z } from "zod";
import { UserRole } from "../types/database";

export const authSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const profileSchema = z.object({
  firstName: z.string().min(1).or(z.literal("")),
  lastName: z.string().min(1).or(z.literal("")),
});

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

export const userSettingsSchema = z.object({
  role: z
    .string()
    .refine((value) => Object.values<string>(UserRole).includes(value)),
});
