import { ScriptFormType } from "@/components/user-dashboard/project-details/breakdown-more/script/CreateScripts";
import { FormFieldConfig } from "@/components/form-component/RenderFormFields";

export const formFields: FormFieldConfig<ScriptFormType>[] = [
  { name: "title", type: "text", placeholder: "Title", label: "Title" },

  {
    name: "set",
    type: "select",
    options: [{ value: "test", label: "Test" }],
    placeholder: "Set",
    label: "Set",
  },
  {
    name: "environment",
    type: "select",
    options: [{ value: "test", label: "Test" }],
    placeholder: "Environment",
    label: "Environment",
  },
  { name: "scriptDay", type: "text", placeholder: "", label: "Script Day" },
  { name: "point", type: "text", placeholder: "", label: "Points in Time (Flashback, Year, etc.)" },

  {
    name: "description",
    type: "textarea",
    placeholder: "Please enter description",
    label: "Description",
  },
  {
    name: "note",
    type: "textarea",
    placeholder: "Please enter note for production",
    label: "Note For production",
    optional: true,
  },
];
