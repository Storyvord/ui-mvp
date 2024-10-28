import { ScenesFormType } from "@/app/(user-dashboard)/project-details/[id]/(breakdown-more)/scenes/_components/CreateScenes";
import { FormFieldConfig } from "@/components/RenderFormFields";

export const formFields: FormFieldConfig<ScenesFormType>[] = [
  { name: "scenesNumber", type: "text", placeholder: "Please enter scenes number", label: "Scenes Number" },

  {
    name: "set",
    type: "select",
    options: [{ value: "set1", label: "Set 1" }],
    placeholder: "Set",
    label: "Set",
  },
  {
    name: "environment",
    type: "select",
    options: [{ value: "environment1", label: "Environment 2" }],
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
