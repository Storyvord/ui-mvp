import { FormFieldConfig } from "@/components/form-component/RenderFormFields";
import { ShotsInformationFormType } from "@/components/user-dashboard/project-details/breakdown-more/shots/CreateShootInformation";
import { ShotsFormType } from "@/components/user-dashboard/project-details/breakdown-more/shots/CreateShots";

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

export const shootInformationFormFields: FormFieldConfig<ShotsInformationFormType>[] = [
  { name: "size", type: "text", placeholder: "Title", label: "Size" },

  {
    name: "type",
    type: "text",
    placeholder: "",
    label: "Type",
  },
  {
    name: "moment",
    type: "text",
    placeholder: "",
    label: "Moment",
  },
  { name: "equipment", type: "text", placeholder: "", label: "Equipment" },

  {
    name: "vfx",
    type: "text",
    placeholder: "",
    label: "VFX",
  },
  {
    name: "camera",
    type: "text",
    placeholder: "",
    label: "Camera",
  },
  {
    name: "lens",
    type: "text",
    placeholder: "",
    label: "Lens",
  },
  {
    name: "frameRate",
    type: "text",
    placeholder: "",
    label: "Frame Rate",
  },
  {
    name: "specialEquipment",
    type: "text",
    placeholder: "",
    label: "Special Equipment",
  },
  {
    name: "sound",
    type: "text",
    placeholder: "",
    label: "Sound",
  },
  {
    name: "lighting",
    type: "text",
    placeholder: "",
    label: "Lighting",
  },
  {
    name: "position",
    type: "text",
    placeholder: "",
    label: "Position",
  },
  {
    name: "setupId",
    type: "text",
    placeholder: "",
    label: "Setup ID",
  },
  {
    name: "unit",
    type: "text",
    placeholder: "",
    label: "Unit",
  },
  {
    name: "note",
    type: "textarea",
    placeholder: "",
    label: "Note",
  },
];
