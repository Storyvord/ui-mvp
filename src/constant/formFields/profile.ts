import { FormFieldConfig } from "@/components/form-component/RenderFormFields";
import { ClientProfileType, CrewProfileType } from "@/lib/validation/auth";

export const CrewProfileFormFields: FormFieldConfig<CrewProfileType>[] = [
  {
    name: "full_name",
    type: "text",
    placeholder: "Enter your full name",
    label: "Full Name",
  },
  {
    name: "contact_number",
    type: "text",
    placeholder: "Enter your contact number",
    label: "Contact Number",
  },
  {
    name: "image",
    type: "file",
    label: "Profile Picture",
    optional: true,
  },
  {
    name: "location",
    type: "text",
    placeholder: "Enter your location",
    label: "Location",
  },
  {
    name: "languages",
    type: "text",
    placeholder: "Enter languages you speak",
    label: "Languages",
  },
  {
    name: "job_title",
    type: "text",
    placeholder: "Enter your job title",
    label: "Job Title",
  },
  {
    name: "bio",
    type: "textarea",
    placeholder: "Enter a short bio about yourself",
    label: "Bio",
  },
  {
    name: "experience",
    type: "text",
    placeholder: "Enter your years of experience",
    label: "Experience",
  },
  {
    name: "skills",
    type: "text",
    placeholder: "Enter your skills",
    label: "Skills",
  },
  {
    name: "standardRate",
    type: "text",
    placeholder: "Enter your standard rate (e.g., $2000/day)",
    label: "Standard Rate",
  },
  {
    name: "technicalProficiencies",
    type: "textarea",
    placeholder: "Enter your technical proficiencies",
    label: "Technical Proficiencies",
  },
  {
    name: "specializations",
    type: "text",
    placeholder: "Enter your specializations",
    label: "Specializations",
  },
  {
    name: "drive",
    type: "checkbox",
    label: "Do you drive?",
    optional: true,
  },
  //   {
  //     name: "active",
  //     type: "checkbox",
  //     label: "Are you actively seeking work?",
  //     optional: true,
  //   },
];

export const CrewProfileFormDefaultValues = {
  full_name: "",
  contact_number: "",
  location: "",
  languages: "",
  job_title: "",
  bio: "",
  experience: "",
  skills: "",
  standardRate: "",
  technicalProficiencies: "",
  specializations: "",
  drive: false,
};

export const ClientProfileFormFields: FormFieldConfig<ClientProfileType>[] = [
  {
    name: "full_name",
    type: "text",
    placeholder: "Enter your full name",
    label: "Full Name",
  },
  {
    name: "contact_number",
    type: "text",
    placeholder: "Enter your contact number",
    label: "Contact Number",
  },
  {
    name: "image",
    type: "file",
    label: "Profile Picture",
    optional: true,
  },
  {
    name: "location",
    type: "text",
    placeholder: "Enter your location",
    label: "Location",
  },
  {
    name: "languages",
    type: "text",
    placeholder: "Enter languages you speak",
    label: "Languages",
  },
  {
    name: "job_title",
    type: "text",
    placeholder: "Enter your job title",
    label: "Job Title",
  },

  {
    name: "role",
    type: "text",
    placeholder: "Enter your role (e.g., Producer)",
    label: "Role",
  },
  {
    name: "address",
    type: "text",
    placeholder: "Enter your address",
    label: "Address",
  },

  {
    name: "personalWebsite",
    type: "text",
    placeholder: "Enter your personal website URL",
    label: "Personal Website",
  },

  {
    name: "bio",
    type: "textarea",
    placeholder: "Enter a short bio about yourself",
    label: "Bio",
  },
  {
    name: "drive",
    type: "checkbox",
    label: "Do you drive?",
  },

  //   {
  //     name: "active",
  //     type: "checkbox",
  //     label: "Are you actively seeking work?",
  //     optional: true,
  //   },
];

export const ClientProfileFormDefaultValues = {
  full_name: "",
  contact_number: "",
  location: "",
  languages: "",
  job_title: "",
  bio: "",
  role: "",
  address: "",
  personalWebsite: "",
  drive: false,
};
