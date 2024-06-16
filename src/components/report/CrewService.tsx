export interface CrewMember {
    name: string;
    yoe: number;
    minRatePerDay: number;
    maxRatePerDay: number;
    location: string;
    profile_pic:string;
    preferred_because: string;
  }
  
  export interface CrewData {
    [role: string]: CrewMember[];
  }
  
  const fetchCrewData = async (project_id: string): Promise<CrewData[]> => {
    const response = await fetch(`https://sv-aibackend.azurewebsites.net/api/crew/project-crew-details/?project_id=${project_id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data: CrewData[] = await response.json();
    return data;
  };
  
  export { fetchCrewData };