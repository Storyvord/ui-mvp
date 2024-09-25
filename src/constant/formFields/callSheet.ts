import { FormFieldConfig } from "@/components/RenderFormFields";
import { ShootFormType } from "@/components/user-dashboard/project-details/planning/call-sheet/CallSheetForm";

export const formFields: FormFieldConfig<ShootFormType>[] = [
  // Project Information
  { name: "title", type: "text", placeholder: "Title", label: "Title" },
  { name: "date", type: "date", placeholder: "Date", label: "Shoot Date" },
  { name: "calltime", type: "time", placeholder: "Call Time", label: "Call Time" },
  { name: "location", type: "text", placeholder: "Mumbai, India", label: "Location" },
  {
    name: "nearest_hospital_address",
    type: "text",
    placeholder: "Nearest Hospital Address",
    label: "Nearest Hospital Address",
    optional: true,
  },
  {
    name: "nearest_police_station",
    type: "text",
    placeholder: "Nearest Police Station",
    label: "Nearest Police Station",
    optional: true,
  },
  {
    name: "nearest_fire_station",
    type: "text",
    placeholder: "Nearest Fire Station",
    label: "Nearest Fire Station",
    optional: true,
  },
  {
    name: "breakfast",
    type: "time",
    placeholder: "Breakfast time",
    label: "Breakfast Time",
  },
  {
    name: "lunch",
    type: "time",
    placeholder: "Lunch time",
    label: "Lunch Time",
  },
  {
    name: "dinner",
    type: "time",
    placeholder: "Dinner time",
    label: "Dinner Time",
  },

  // Department Instructions (Dynamic)
  {
    name: "call_time.0.name",
    type: "text",
    placeholder: "Name",
    label: "Name",
  },
  {
    name: "call_time.0.position",
    type: "text",
    placeholder: "Position",
    label: "Position",
  },
  {
    name: "call_time.0.phone",
    type: "number",
    placeholder: "Contact No",
    label: "Contact No",
  },
  {
    name: "call_time.0.email",
    type: "email",
    placeholder: "Email",
    label: "Email",
  },
  {
    name: "call_time.0.calltime",
    type: "time",
    placeholder: "Time",
    label: "Time",
  },
  {
    name: "call_time.0.remarks",
    type: "text",
    placeholder: "Remark",
    label: "Remark",
    optional: true,
  },
  {
    name: "production_notes",
    type: "textarea",
    placeholder: "Production notes",
    label: "Production Notes",
    optional: true,
  },

  {
    name: "additional_notes",
    type: "textarea",
    placeholder: "Additional notes",
    label: "Additional Notes",
    optional: true,
  },
  // {
  //   name: "allowed_users",
  //   type: "select",
  //   isMulti: true,
  //   options: [{ value: "", label: "" }],
  //   label: "Access Right",
  //   placeholder: "",
  //   optional: true,
  // },
];
export const defaultValues: ShootFormType = {
  // Project Information
  title: "",
  date: "",
  calltime: "",
  location: "",
  nearest_hospital_address: "",
  nearest_police_station: "",
  nearest_fire_station: "",
  breakfast: "",
  lunch: "",
  dinner: "",

  // Department Instructions (Dynamic)
  call_time: [
    {
      name: "",
      position: "",
      phone: "",
      email: "",
      remarks: "",
      calltime: "",
    },
  ],

  additional_notes: "",
  production_notes: "",
  // allowed_users: [],
};
