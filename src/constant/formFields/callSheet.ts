import { FormFieldConfig } from "@/components/RenderFormFields";
import { ShootFormType } from "@/components/user-dashboard/project-details/planning/call-sheet/CallSheetForm";

export const formFields: FormFieldConfig<ShootFormType>[] = [
  // Project Information
  { name: "title", type: "text", placeholder: "Title", label: "Title" },
  { name: "date", type: "date", placeholder: "Date", label: "Shoot Date" },
  { name: "calltime", type: "time", placeholder: "Call Time", label: "Call Time" },
  { name: "location", type: "text", placeholder: "Location", label: "Location" },
  {
    name: "nearest_hospital_address",
    type: "text",
    placeholder: "Nearest Hospital Address",
    label: "Nearest Hospital Address",
  },
  {
    name: "nearest_police_station",
    type: "text",
    placeholder: "Nearest Police Station",
    label: "Nearest Police Station",
  },
  {
    name: "nearest_fire_station",
    type: "text",
    placeholder: "Nearest Fire Station",
    label: "Nearest Fire Station",
  },

  // Events (Dynamic)
  { name: "events.0.time", type: "time", placeholder: "Event Time", label: "Event Time" },
  { name: "events.0.title", type: "text", placeholder: "Event Title", label: "Event Title" },

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
    name: "call_time.0.remark",
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
];
export const defaultValues: ShootFormType = {
  // Project Information
  title: "Project Sunrise",
  date: "2024-10-04", // YYYY-MM-DD format
  calltime: "08:00", // HH:MM format
  location: "Central Park, New York",
  nearest_hospital_address: "123 Main St, New York, NY",
  nearest_police_station: "456 Elm St, New York, NY",
  nearest_fire_station: "789 Oak St, New York, NY",

  // Events (Dynamic)
  events: [
    {
      time: "09:00", // Event time in HH:MM format
      title: "Crew Call",
    },
    {
      time: "10:00",
      title: "First Scene Shoot",
    },
  ],

  // Department Instructions (Dynamic)
  call_time: [
    {
      name: "SOuvik",
      position: "Developer",
      phone: "7029835504",
      email: "souvik@storyvord.com",
      remark: "no remark",
      calltime: "05:25",
    },
  ],

  additional_notes: "",
  production_notes: "",
};
