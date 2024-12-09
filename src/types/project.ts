export type LocationDetails = {
  id: number;
  location: string;
  start_date: string; // ISO date format: YYYY-MM-DD
  end_date: string; // ISO date format: YYYY-MM-DD
  mode_of_shooting: "both" | "photo" | "video"; // Assuming "both" is one of the possible values
  permits: boolean;
};

export type Crew = {
  id: number;
  crew_title: string;
  quantity: number;
};

export type Equipment = {
  id: number;
  equipment_title: string;
  quantity: number;
};
export type ProjectStatus =
  | "PLANNING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "PAUSED"
  | "DEVELOPMENT"
  | "PRE_PRODUCTION"
  | "POST_PRODUCTION"
  | "RELEASED";

export type Project = {
  project_id: string;
  location_details: LocationDetails[];
  selected_crew: Crew[];
  equipment: Equipment[];
  uploaded_document: string | null;
  name: string;
  brief: string;
  additional_details: string;
  budget_currency: string;
  budget_amount: string;
  content_type: string;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
  crew_profiles: number[];
};
