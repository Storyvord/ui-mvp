import { z } from "zod";

export const addressBookFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  positions: z.string().min(5, "Position is required"),
  email: z.string().email("Invalid email address"),
  secondary_email: z.string().email("Invalid secondary email address"),
  phone_office: z.string().min(1, "Office phone is required"),
  phone_work: z.string().min(1, "Work phone is required"),
  phone_home: z.string().min(1, "Home phone is required"),
  phone_private: z.string().min(1, "Private phone is required"),
});

export const companySettingsSchema = z.object({
  company_name: z.string().min(1, "Company name is required."),
  company_logo: z
    .union([
      z.string(),
      z.instanceof(ArrayBuffer),
      z
        .instanceof(File)
        .refine(
          (file) =>
            file.type === "image/jpeg" ||
            (file.type === "image/png" && file.size <= 5 * 1024 * 1024),
          {
            message: "Only .jpg, .png, and jpeg files are accepted",
          }
        ),
    ])
    .optional()
    .nullable(),
  street: z.string().min(1, "Street is required."),
  cityandstate: z.string().min(1, "City and State are required."),
  postalcode: z.string().min(1, "Postal Code is required."),
  country: z.string().min(1, "Country is required."),
  name: z.string().min(1, "Name is required."),
  email: z.string().min(1, "Email is required.").email("Invalid email format."),
  phone: z.string().min(1, "Phone number is required."),
  fax: z.string().min(1, "Fax is required."),
});
