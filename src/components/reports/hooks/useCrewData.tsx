// hooks/useCrewData.ts
import { useState, useEffect } from "react";
import { CrewData, fetchCrewData } from "@/components/reports/crewService";

const useCrewData = (numEntries: number) => {
  const [crewData, setCrewData] = useState<CrewData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCrewData(numEntries);
        console.log("Fetched Crew Data:", data); // Debug logging
        setCrewData(data);
      } catch (error) {
        setError("Failed to fetch crew data");
        console.error("Error:", error); // Debug logging
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [numEntries]);

  return { crewData, isLoading, error };
};

export default useCrewData;
