import { z } from "zod";

export const profileFormValidationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(2, "Phone is required"),
  image: z
    .instanceof(File)
    .refine((file) => file.type === "image/jpeg" || file.type === "image/png", {
      message: "Only .jpg or .png files are accepted",
    }),
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
  portfolios: z.array(
    z.object({
      title: z.string().min(2, "Title is required"),
      link: z.string().url("Link must be a valid URL"),
      image: z.custom<File>((file) => file instanceof File && file.size > 0, {
        message: "Image is required",
      }),
      contentTag: z.string().min(2, "Content Tag is required"),
      description: z.string().min(2, "Description is required"),
      providedService: z.string().min(2, "Provided Service is required"),
    })
  ),
});

export const educationFormValidationSchema = z.object({
  educations: z.array(
    z.object({
      academicQualifications: z.string().min(2, "academic qualifications required"),
      professionalCourses: z.string().min(2, "professional course required"),
      workshopsAttended: z.string().min(2, "workshops attended required"),
    })
  ),
});

export const socialLinksFormValidationSchema = z.object({
  socialLinks: z.array(
    z.object({
      link: z.string().url("Link must be a valid URL"),
    })
  ),
});

export const endorsementFormValidationSchema = z.object({
  endorsement: z.array(
    z.object({
      text: z.string().min(2, "Link must be a valid URL"),
      givenBy: z.string().min(2, "Link must be a valid URL"),
    })
  ),
});
