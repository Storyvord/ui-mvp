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

export const imageSchema = z
  .union([
    z.string(), // For cases where an image might be passed as a URL or base64 string
    z.instanceof(ArrayBuffer), // For raw binary data
    z
      .instanceof(File)
      .refine((file) => file.type === "image/jpeg" || file.type === "image/png", {
        message: "Only .jpg or .png of .jpeg files are accepted",
      })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "File size must be less than or equal to 5MB",
      }),
  ])
  .nullable()
  .optional();

export const CrewProfileSchema = z.object({
  full_name: z.string().min(1, "Full Name is required"),
  contact_number: z.string().regex(/^\d{10,15}$/, "Contact Number must be 10-15 digits"),
  location: z.string().min(1, "Location is required"),
  languages: z.string().min(1, "Languages are required"),
  job_title: z.string().min(1, "Job Title is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters long"),
  experience: z.string().min(1, "Experience is required"),
  skills: z.string().min(1, "Skills are required"),
  standardRate: z.string().regex(/^\$\d+\/day$/, "Standard Rate must be in the format $2000/day"),
  technicalProficiencies: z.string().min(1, "Technical Proficiencies are required"),
  specializations: z.string().min(1, "Specializations are required"),
  drive: z.boolean(),
});
export type CrewProfileType = z.infer<typeof CrewProfileSchema>;

export const ClientProfileSchema = z.object({
  full_name: z.string().min(1, "Full Name is required"),
  contact_number: z.string().regex(/^\d{10,15}$/, "Contact Number must be 10-15 digits"),
  image: imageSchema,
  location: z.string().min(1, "Location is required"),
  languages: z.string().min(1, "Languages are required"),
  job_title: z.string().min(1, "Job Title is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters long"),
  role: z.string().min(1, "Role is required"),
  address: z.string().min(1, "Address is required"),
  personalWebsite: z.string().url("Personal Website must be a valid URL"),
  drive: z.boolean(),
});
export type ClientProfileType = z.infer<typeof ClientProfileSchema>;
