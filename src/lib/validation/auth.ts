import { z } from "zod";

export const employeeRegistrationFormSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }), // Validate email format
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }), // Validate password length
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm Password must be at least 8 characters long" }), // Optional: can be removed if only matching is required
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
