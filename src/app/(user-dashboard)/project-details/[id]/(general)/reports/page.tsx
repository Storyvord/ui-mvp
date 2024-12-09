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
import {
  useGetRequirements,
  useGetSuggestions,
} from "@/lib/react-query/queriesAndMutations/aiSuggestions";
import CrewPage from "@/components/report/CrewPage";

const tabs = ["Crew", "Equipment", "Logistics", "Compliance", "Culture", "Budget"];

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("Crew");
  const [crewRequirements, setCrewRequirements] = useState<any>(null);
  const [equipmentRequirements, setEquipmentRequirements] = useState<any>(null);
  const [logisticsData, setLogisticsData] = useState<any>(null);
  const [complianceData, setComplianceData] = useState<any>(null);
  const [cultureData, setCultureData] = useState<any>(null);
  const [budgetData, setBudgetData] = useState<any>(null);

  const { id: project_id }: { id: string } = useParams();

  const { data: projectRequirements } = useGetProjectRequirements(project_id);
  const {
    mutateAsync: getRequirementsSuggestions,
    isPending: isPendingRequirementsSuggestions,
    isError: isErrorRequirementsSuggestions,
  } = useGetRequirements();
  const {
    data: suggestions,
    isPending: isPendingSuggestions,
    isError: isErrorSuggestions,
  } = useGetSuggestions(project_id);

  useEffect(() => {
    (async () => {
      if (projectRequirements) {
        const requirementsSuggestions = await getRequirementsSuggestions(
          projectRequirements.results[0].id
        );

        setCrewRequirements(requirementsSuggestions?.data.suggested_crew);
        setEquipmentRequirements(requirementsSuggestions?.data.suggested_equipment);

        if (suggestions?.data?.suggestion?.data) {
          const logistics = suggestions.data.suggestion.data.map((item: any) => {
            return { location: item.location, data: item.ai_suggestion[0].logistics };
          });
          const compliance = suggestions.data.suggestion.data.map((item: any) => {
            return { location: item.location, data: item.ai_suggestion[0].compliance };
          });
          const culture = suggestions.data.suggestion.data.map((item: any) => {
            return { location: item.location, data: item.ai_suggestion[0].culture };
          });
          const budget = suggestions.data.suggestion.data.map((item: any) => {
            return { location: item.location, data: item.ai_suggestion[0].budget };
          });

          setLogisticsData(logistics);
          setComplianceData(compliance);
          setCultureData(culture);
          setBudgetData(budget);
        }
      }
    })();
  }, [projectRequirements, suggestions]);

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
      {activeTab === "Logistics" && (
        <LogisticsPage
          data={logisticsData}
          isPending={isPendingSuggestions}
          isError={isErrorSuggestions}
        />
      )}
      {activeTab === "Compliance" && (
        <CompliancePage
          data={complianceData}
          isPending={isPendingSuggestions}
          isError={isErrorSuggestions}
        />
      )}
      {activeTab === "Culture" && (
        <CulturePage
          data={cultureData}
          isPending={isPendingSuggestions}
          isError={isErrorSuggestions}
        />
      )}
      {activeTab === "Budget" && (
        <BudgetPage
          data={budgetData}
          isPending={isPendingSuggestions}
          isError={isErrorSuggestions}
        />
      )}
    </div>
  );
};

export default ReportsPage;
