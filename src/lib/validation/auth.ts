import { z } from "zod";

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const signUpFormSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    // userType: z.string().min(1, "User type required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(strongPasswordRegex, {
        message: "Password needs uppercase, lowercase, number, & special char.",
      }),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      const emailLocalPart = data.email.split("@")[0].toLowerCase();
      const password = data.password.toLowerCase();
      return !password.includes(emailLocalPart);
    },
    {
      message: "The password is too similar to the email address.",
      path: ["password"],
    }
  );

export const signinFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }), // Validate email format
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }), // Validate password length
});

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
