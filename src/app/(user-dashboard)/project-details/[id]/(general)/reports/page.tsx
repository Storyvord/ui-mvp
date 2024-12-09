"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Tabs from "@/components/Tabs";
import EquipmentPage from "@/components/report/EquipmentPage";
import LogisticsPage from "@/components/report/logistics/LogisticsPage";
import CompliancePage from "@/components/report/compliance/CompliancePage";
import CulturePage from "@/components/report/culture/CulturePage";
import BudgetPage from "@/components/report/BudgetPage";
import { useGetProjectRequirements } from "@/lib/react-query/queriesAndMutations/project";
import { useGetRequirements } from "@/lib/react-query/queriesAndMutations/aiSuggestions";
import CrewPage from "@/components/report/CrewPage";

const tabs = ["Crew", "Equipment", "Logistics", "Compliance", "Culture", "Budget"];

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("Crew");
  const [crewRequirements, setCrewRequirements] = useState<any>(null);
  const [equipmentRequirements, setEquipmentRequirements] = useState<any>(null);

  const { id: project_id }: { id: string } = useParams();

  const { data: projectRequirements } = useGetProjectRequirements(project_id);
  const {
    mutateAsync: getRequirementsSuggestions,
    isPending: isPendingRequirementsSuggestions,
    isError: isErrorRequirementsSuggestions,
  } = useGetRequirements();

  useEffect(() => {
    (async () => {
      if (projectRequirements) {
        const requirementsSuggestions = await getRequirementsSuggestions(
          projectRequirements.results[0].id
        );
        setCrewRequirements(requirementsSuggestions?.data.suggested_crew);
        setEquipmentRequirements(requirementsSuggestions?.data.suggested_equipment);
      }
    })();
  }, [projectRequirements]);

  console.log("crewRequirements", crewRequirements);
  console.log("equipmentRequirements", equipmentRequirements);

  return (
    <div className="container mx-auto p-4">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      {activeTab === "Crew" && (
        <CrewPage
          crewRequirements={crewRequirements}
          isPending={isPendingRequirementsSuggestions}
          isError={isErrorRequirementsSuggestions}
        />
      )}
      {activeTab === "Equipment" && (
        <EquipmentPage
          equipmentRequirements={equipmentRequirements}
          isPending={isPendingRequirementsSuggestions}
          isError={isErrorRequirementsSuggestions}
        />
      )}
      {activeTab === "Logistics" && <LogisticsPage project_id={project_id} />}
      {activeTab === "Compliance" && <CompliancePage project_id={project_id} />}
      {activeTab === "Culture" && <CulturePage project_id={project_id} />}
      {activeTab === "Budget" && <BudgetPage />}
    </div>
  );
};

export default ReportsPage;
