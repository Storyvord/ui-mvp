import { CrewData } from "@/types";

const fetchCrewData = async (project_id: string): Promise<CrewData> => {
  const response = await fetch(`https://sv-aibackend.azurewebsites.net/api/crew/project-crew-details/?project_id=${project_id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data: any = await response.json();

  // Transform data to match the CrewData interface
  const transformedData: CrewData = {
    project_id: data.project_id,
    project_name: data.project_name,
    crew_requirements_set: data.crew_requirements_set.map((requirement: any) => ({
      role: requirement.role,
      location: requirement.location,
      crewMembers: requirement.selected_crews.map((crew: any) => ({
        name: crew.name,
        yoe: crew.yoe,
        minRatePerDay: crew.minRatePerDay,
        maxRatePerDay: crew.maxRatePerDay,
        location: crew.location,
        profile_pic: crew.profile_pic,
        preferred_because: crew.preferred_because,
      })),
    }))
  };

  return transformedData;
};

export { fetchCrewData };