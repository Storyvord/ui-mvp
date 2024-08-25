import { FieldValues, Path } from "react-hook-form";

export type ProfileFormData = {
  name: string;
  phone: string;
  image: string | ArrayBuffer | File | null;
  location: string;
  languages: string;
  job_title: string;
  bio: string;
  experience: string;
  skills: string;
  standardRate: string;
  technicalProficiencies: string;
  specializations: string;
  drive: boolean;
  active: boolean;
};

export type FormFieldConfig<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type: "text" | "number" | "textarea" | "checkbox" | "date" | "file" | "datetime-local";
  placeholder?: string;
};

export type PortfolioFormData = {
  id?: number;
  title: string;
  link: string;
  image: string | ArrayBuffer | File | null;
  contentTag: string;
  description: string;
  providedService: string;
  verification_type?: string;
};

export type EducationFormType = {
  id?: number;
  academicQualifications: string;
  professionalCourses: string;
  workshopsAttended: string;
  crew?: number;
};

export type SocialLinkFormType = {
  id?: number;
  link: string;
};

export type EndorsementFormType = {
  id?: number;
  text: string;
  givenBy: string;
  crew?: number;
};
export type CreditsFormFields = {
  id?: number;
  title: string;
  year: string;
  role: string;
  production: string;
  type_of_content: string;
  tags: string;
  crew?: number;
};
