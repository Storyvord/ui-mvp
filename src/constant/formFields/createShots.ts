import { ShotsFormType } from "@/app/(user-dashboard)/project-details/[id]/(breakdown-more)/shots/_components/CreateShots";
import { FormFieldConfig } from "@/components/RenderFormFields";

export const formFields: FormFieldConfig<ShotsFormType>[] = [
  { name: "shotId", type: "text", placeholder: "Title", label: "Shot ID" },

  {
    name: "subject",
    type: "text",
    options: [{ value: "test", label: "Test" }],
    placeholder: "Enter subject",
    label: "Subject",
  },
  {
    name: "visual",
    type: "text",
    options: [{ value: "test", label: "Test" }],
    placeholder: "",
    label: "Visual",
  },
  { name: "audio", type: "text", placeholder: "", label: "Audio" },

  {
    name: "imageAndProduction",
    type: "file",
    placeholder: "Please enter description",
    label: "Image & Production",
    isMulti: false,
  },
];
