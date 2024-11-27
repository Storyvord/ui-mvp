import { FormFieldConfig } from "@/components/form-component/RenderFormFields";
import { ProjectFormFieldType } from "@/components/user-dashboard/dashboard/CreateProjectForm";
import { content_type, crew_data, equipment_data } from "@/constant/constant";

export const CreateProjectFields: FormFieldConfig<ProjectFormFieldType>[] = [
  {
    name: "projectName",
    label: "Project Name",
    type: "text",
    placeholder: "Project name",
  },
  {
    name: "contentType",
    label: "Content Type",
    type: "select",
    options: content_type,
    placeholder: "Select content type",
  },
  {
    name: "budget",
    label: "Budget",
    type: "slider",
    placeholder: "Enter budget",
    minValue: 0.5,
    maxValue: 200,
  },
  {
    name: "crew",
    label: "Crew",
    type: "selectWithQuantity",
    options: crew_data,
    placeholder: "Select crew",
  },
  {
    name: "equipment",
    label: "Equipment",
    type: "selectWithQuantity",
    options: equipment_data,
    placeholder: "Select equipment",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Project description (minimum 100 words)",
  },
  {
    name: "uploadedDocument",
    label: "Upload Document",
    type: "file",
    placeholder: "Upload document",
    isMulti: true,
    optional: true,
  },
  {
    name: "aiSuggestions",
    label: "AI Suggestions",
    type: "checkbox",
  },
  {
    name: "locationDetails.0.location",
    label: "Location",
    type: "text",
    placeholder: "Enter location",
  },
  {
    name: "locationDetails.0.start_date",
    label: "Start Date",
    type: "date",
    placeholder: "Select start date",
  },
  {
    name: "locationDetails.0.end_date",
    label: "End Date",
    type: "date",
    placeholder: "Select end date",
  },
  {
    name: "locationDetails.0.mode_of_shooting",
    label: "Mode of Shooting",
    type: "select",
    options: [
      { value: "indoor", label: "Indoor" },
      { value: "outdoor", label: "Outdoor" },
      { value: "both", label: "Both" },
    ],
    placeholder: "Select mode of shooting",
  },
  {
    name: "locationDetails.0.permits",
    label: "I need Filming Permit",
    type: "checkbox",
  },
];

export const defaultValues = {
  projectName: "",
  contentType: "",
  budget: 500,
  description: "",
  locationDetails: [
    {
      location: "",
      start_date: "",
      end_date: "",
      permits: true,
      mode_of_shooting: undefined,
    },
  ],
  uploadedDocument: [],
  aiSuggestions: true,
  crew: [],
  equipment: [],
};
