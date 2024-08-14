import { FieldValues, Path } from "react-hook-form";

export type ProfileFormData = {
  name: string;
  phone: string;
  image: File | null;
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
  type: "text" | "number" | "textarea" | "checkbox" | "date" | "file";
  placeholder?: string;
};

export type PortfolioFormData = {
  title: string;
  link: string;
  image: File | null;
  contentTag: string;
  description: string;
  providedService: string;
  // verification_type: "client_reference";
};

export type EducationFormType = {
  academicQualifications: string;
  professionalCourses: string;
  workshopsAttended: string;
};
