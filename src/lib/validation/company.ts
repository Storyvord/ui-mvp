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
