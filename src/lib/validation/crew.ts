import { z } from "zod";

export const profileFormValidationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(2, "Phone is required"),
  image: z.string().url("Image must be a valid URL"),
  location: z.string().min(2, "Location is required"),
  languages: z.string().min(2, "Languages are required"),
  job_title: z.string().min(2, "Job title is required"),
  bio: z.string().min(2, "Bio is required"), 
  experience: z.string().min(2, "Experience is required"),
  skills: z.string().min(2, "Skills are required"),
  standardRate: z.string().min(2, "Standard rate is required"),
  technicalProficiencies: z.string().min(2, "Technical proficiencies are required"),
  specializations: z.string().min(2, "Specializations are required"),
  drive: z.boolean(), 
  active: z.boolean(),
});
