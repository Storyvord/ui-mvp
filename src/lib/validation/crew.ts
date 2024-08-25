import { z } from "zod";

export const profileFormValidationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(2, "Phone is required"),
  image: z.union([
    z.string(),
    z.instanceof(ArrayBuffer),
    z.instanceof(File).refine((file) => file.type === "image/jpeg" || file.type === "image/png", {
      message: "Only .jpg or .png files are accepted",
    }),
  ]),
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

export const portfolioFormValidationSchema = z.object({
  title: z.string().min(2, "Title is required"),
  link: z.string().url("Link must be a valid URL"),
  image: z.union([
    z.string(),
    z.instanceof(ArrayBuffer),
    z.instanceof(File).refine((file) => file.type === "image/jpeg" || file.type === "image/png", {
      message: "Only .jpg or .png files are accepted",
    }),
  ]),
  contentTag: z.string().min(2, "Content Tag is required"),
  description: z.string().min(2, "Description is required"),
  providedService: z.string().min(2, "Provided Service is required"),
});

export const educationFormValidationSchema = z.object({
  academicQualifications: z.string().min(2, "Academic qualifications required"),
  professionalCourses: z.string().min(2, "Professional course required"),
  workshopsAttended: z.string().min(2, "Workshops attended required"),
});

export const socialLinksFormValidationSchema = z.object({
  link: z.string().url("Link must be a valid URL"),
});

export const endorsementFormValidationSchema = z.object({
  text: z.string().min(2, "Text is required"),
  givenBy: z.string().min(2, "Given by is required"),
});

export const creditsFormValidationSchema = z.object({
  title: z.string().min(2, "Title is required"),
  year: z.string().min(2, "Year is required"),
  role: z.string().min(2, "Role is required"),
  production: z.string().min(2, "production is required"),
  type_of_content: z.string().min(2, "Type of content is required"),
  tags: z.string().min(2, "tags is required"),
});
