// services/crewService.ts

export interface CrewMember {
  name: string;
  yoe: number;
  minRatePerDay: number;
  maxRatePerDay: number;
  location: string;
  preferred_because: string;
}

export interface CrewData {
  [role: string]: CrewMember[];
}

const fetchCrewData = async (numEntries: number): Promise<CrewData[]> => {
  const response = await fetch(`https://crewbotdummy.vercel.app/CrewBot?numEntries=${numEntries}`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data: CrewData[] = await response.json();
  return data;
};

export { fetchCrewData };