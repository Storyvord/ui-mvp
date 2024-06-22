import { Metadata } from "next";

import ClientComponent from "@/components/report/ClientComponent";
import { CrewData } from "@/types";
import { fetchCrewData } from "@/components/report/CrewService";

export const metadata: Metadata = {
  title: "Project Reports",
};

interface PageProps {
  params: {
    id: string;
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { id: project_id } = params;
  let crewData: CrewData;

  try {
    crewData = await fetchCrewData(project_id);
  } catch (error) {
    console.error("Failed to fetch crew data", error);
    crewData = { project_id, project_name: '', crew_requirements_set: [] };
  }

  return <ClientComponent project_id={project_id} crewRequirements={crewData.crew_requirements_set} />;
};

export default Page;