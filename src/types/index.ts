import { z } from "zod";
import { projectFormSchema, taskFormSchema } from "../lib/validation";

interface project {
  id: number;
  name: string;
  start_date?: string;
  end_date?: string;
  budget?: string;
  location?: string;
  status: boolean;
}

export type projectArray = project[];

type itemType = {
  text: string;
  link: string;
  icon: React.FC;
};

export type projectDetailItem = {
  title: string;
  items: itemType[];
};

export type calenderFormType = {
  title: string;
  start: string;
  end: string;
  desc?: string;
  location?: string;
  participants?: string[];
};

export type calenderEventType = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  desc?: string;
  location?: string;
  participants?: string[];
};

export type projectFormInputType = z.infer<typeof projectFormSchema>;

export type taskType = {
  id: number;
  title: string;
  desc?: string;
  deadline: string;
  status: boolean;
};

export type taskFormType = z.infer<typeof taskFormSchema>;

export interface CrewMember {
  name: string;
  yoe: number; // Years of Experience
  minRatePerDay: string; // Keeping it as string if that's how it comes from the backend
  maxRatePerDay: string; // Keeping it as string if that's how it comes from the backend
  location: string;
  profile_pic: string;
  preferred_because: string;
}

export interface CrewRequirement {
  role: string;
  location: string;
  crewMembers: CrewMember[];
}

export interface CrewData {
  project_id: string;
  project_name: string;
  crew_requirements_set: CrewRequirement[];
}

export type SelectedCrewMember = {
  id: number;
  profile_pic: string;
  name: string;
  userid: string;
  crewType: string;
  role: string;
  services: string;
  tags: string;
  expertise: string;
  yoe: number;
  minRatePerDay: string;
  maxRatePerDay: string;
  next_available_date: string;
  location: string;
};


export type PreferredCrewMember = {
  crew_member: SelectedCrewMember;
  preferred_because: string;
};
