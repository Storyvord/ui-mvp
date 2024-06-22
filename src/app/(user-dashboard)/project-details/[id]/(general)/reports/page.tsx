import { Metadata } from "next";

import { CrewData, fetchCrewData } from "@/components/report/CrewService";
import ClientComponent from "@/components/report/ClientComponent";

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
  let crewData: CrewData[] = [];

  try {
    crewData = await fetchCrewData(project_id);
  } catch (error) {
    console.error("Failed to fetch crew data", error);
  }

  return <ClientComponent project_id={project_id} crewData={crewData} />;
};

export default Page;