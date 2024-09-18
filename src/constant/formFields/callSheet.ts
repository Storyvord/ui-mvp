import { FormFieldConfig } from "@/components/RenderFormFields";
import { ShootFormType } from "@/components/user-dashboard/project-details/planning/call-sheet/CallSheetForm";

export const formFields: FormFieldConfig<ShootFormType>[] = [
  // Project Information
  { name: "title", type: "text", placeholder: "Title", label: "Project Title" },
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

  // Scenes (Dynamic)
  {
    name: "scenes.0.scene_number",
    type: "text",
    placeholder: "Scene Number",
    label: "Scene Number",
  },
  {
    name: "scenes.0.description",
    type: "textarea",
    placeholder: "Description",
    label: "Scene Description",
  },
  { name: "scenes.0.page_count", type: "number", placeholder: "Page Count", label: "Page Count" },
  { name: "scenes.0.cast", type: "text", placeholder: "Cast", label: "Cast Members" },
  { name: "scenes.0.location", type: "text", placeholder: "Location", label: "Scene Location" },
  {
    name: "scenes.0.other_notes",
    type: "textarea",
    placeholder: "Other Notes",
    label: "Additional Notes",
  },

  // Characters (Dynamic)
  {
    name: "characters.0.character_name",
    type: "text",
    placeholder: "Character Name",
    label: "Character Name",
  },
  { name: "characters.0.actor", type: "text", placeholder: "Actor", label: "Actor Name" },
  { name: "characters.0.status", type: "time", placeholder: "Status Time", label: "Status Time" },
  { name: "characters.0.pickup", type: "time", placeholder: "Pickup Time", label: "Pickup Time" },
  {
    name: "characters.0.arrival",
    type: "time",
    placeholder: "Arrival Time",
    label: "Arrival Time",
  },
  { name: "characters.0.makeup", type: "time", placeholder: "Makeup Time", label: "Makeup Time" },
  {
    name: "characters.0.costume",
    type: "time",
    placeholder: "Costume Time",
    label: "Costume Time",
  },
  {
    name: "characters.0.rehearsal",
    type: "time",
    placeholder: "Rehearsal Time",
    label: "Rehearsal Time",
  },
  { name: "characters.0.on_set", type: "time", placeholder: "On Set Time", label: "On Set Time" },
  {
    name: "characters.0.info",
    type: "textarea",
    placeholder: "Character Info",
    label: "Character Information",
  },

  // Extras (Dynamic)
  {
    name: "extras.0.scene_number",
    type: "text",
    placeholder: "Scene Number",
    label: "Scene Number",
  },
  { name: "extras.0.extra", type: "text", placeholder: "Extra Role", label: "Extra Role" },
  {
    name: "extras.0.arrival",
    type: "time",
    placeholder: "Arrival Time",
    label: "Extra Arrival Time",
  },
  { name: "extras.0.makeup", type: "time", placeholder: "Makeup Time", label: "Extra Makeup Time" },
  {
    name: "extras.0.costume",
    type: "time",
    placeholder: "Costume Time",
    label: "Extra Costume Time",
  },
  {
    name: "extras.0.rehearsal",
    type: "time",
    placeholder: "Rehearsal Time",
    label: "Extra Rehearsal Time",
  },
  { name: "extras.0.on_set", type: "time", placeholder: "On Set Time", label: "Extra On Set Time" },

  // Department Instructions (Dynamic)
  {
    name: "department_instructions.0.department",
    type: "text",
    placeholder: "Department",
    label: "Department",
  },
  {
    name: "department_instructions.0.instructions",
    type: "textarea",
    placeholder: "Instructions",
    label: "Instructions",
  },
];
// export const defaultValues: ShootFormType = {
//   // Project Information
//   title: "Project Sunrise",
//   date: "2024-10-04", // YYYY-MM-DD format
//   calltime: "08:00", // HH:MM format
//   location: "Central Park, New York",
//   nearest_hospital_address: "123 Main St, New York, NY",
//   nearest_police_station: "456 Elm St, New York, NY",
//   nearest_fire_station: "789 Oak St, New York, NY",

//   // Events (Dynamic)
//   events: [
//     {
//       time: "09:00", // Event time in HH:MM format
//       title: "Crew Call",
//     },
//     {
//       time: "10:00",
//       title: "First Scene Shoot",
//     },
//   ],

//   // Scenes (Dynamic)
//   scenes: [
//     {
//       scene_number: "1",
//       description: "Opening scene in the park with the main characters.",
//       page_count: 3, // Page count
//       cast: "John Doe, Jane Smith",
//       location: "Central Park, near the fountain",
//       other_notes: "Sunny day expected. Ensure lighting reflects natural sunlight.",
//     },
//     {
//       scene_number: "2",
//       description: "Coffee shop conversation.",
//       page_count: 2,
//       cast: "John Doe, Mary Johnson",
//       location: "Downtown Cafe",
//       other_notes: "Indoor shoot, adjust lighting accordingly.",
//     },
//   ],

//   // Characters (Dynamic)
//   characters: [
//     {
//       character_name: "John Doe",
//       actor: "Tom Hanks",
//       status: "07:30",
//       pickup: "07:30",
//       arrival: "08:00",
//       makeup: "08:15",
//       costume: "08:30",
//       rehearsal: "08:45",
//       on_set: "09:00",
//       info: "Lead character, needs special attention.",
//     },
//     {
//       character_name: "Jane Smith",
//       actor: "Emma Watson",
//       status: "07:45",
//       pickup: "07:45",
//       arrival: "08:15",
//       makeup: "08:30",
//       costume: "08:45",
//       rehearsal: "09:00",
//       on_set: "09:15",
//       info: "Supporting character, minimal makeup.",
//     },
//   ],

//   // Extras (Dynamic)
//   extras: [
//     {
//       scene_number: "1",
//       extra: "Background Pedestrians",
//       arrival: "07:45",
//       makeup: "08:15",
//       costume: "08:30",
//       rehearsal: "08:45",
//       on_set: "09:00",
//     },
//     {
//       scene_number: "2",
//       extra: "Cafe Customers",
//       arrival: "09:30",
//       makeup: "09:45",
//       costume: "10:00",
//       rehearsal: "10:15",
//       on_set: "10:30",
//     },
//   ],

//   // Department Instructions (Dynamic)
//   department_instructions: [
//     {
//       department: "Camera",
//       instructions: "Set up at location 1 by 08:00. Ensure all lenses are clean.",
//     },
//     {
//       department: "Lighting",
//       instructions: "Adjust for natural light in scene 1. Use soft lighting in scene 2.",
//     },
//   ],
// };

export const defaultValues: ShootFormType = {
  // Project Information
  title: "",
  date: "",
  calltime: "",
  location: "",
  nearest_hospital_address: "",
  nearest_police_station: "",
  nearest_fire_station: "",

  // Events (Dynamic)
  events: [
    {
      time: "",
      title: "",
    },
  ],

  // Scenes (Dynamic)
  scenes: [
    {
      scene_number: "",
      description: "",
      page_count: 1, // Default to 1 as it must be a positive integer
      cast: "",
      location: "",
      other_notes: "",
    },
  ],

  // Characters (Dynamic)
  characters: [
    {
      character_name: "",
      actor: "",
      status: "",
      pickup: "",
      arrival: "",
      makeup: "",
      costume: "",
      rehearsal: "",
      on_set: "",
      info: "", // Optional field, so can be an empty string
    },
  ],

  // Extras (Dynamic)
  extras: [
    {
      scene_number: "",
      extra: "",
      arrival: "",
      makeup: "",
      costume: "",
      rehearsal: "",
      on_set: "",
    },
  ],

  // Department Instructions (Dynamic)
  department_instructions: [
    {
      department: "",
      instructions: "",
    },
  ],
};
