"use client";

import { useState } from "react";

import Tabs from "@/components/report/TabComponent";
import { CrewData } from "@/components/report/CrewService";
import CrewPageClient from "./CrewPageClient";
import EquipmentPage from "./EquipmentPage";
import LogisticsPage from "./LogisticsPage";
import CompliancePage from "./CompliancePage";
import BudgetPage from "./BudgetPage";

interface ClientComponentProps {
  project_id: string;
  crewData: CrewData[];
}

const ClientComponent: React.FC<ClientComponentProps> = ({
  project_id,
  crewData,
}) => {
  const [activeTab, setActiveTab] = useState("Crew");

  return (
    <div className="container mx-auto p-4">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Crew" && <CrewPageClient crewData={crewData} />}
      {activeTab === "Equipment" && <EquipmentPage />}
      {activeTab === "Logistics" && <LogisticsPage />}
      {activeTab === "Compliance" && <CompliancePage />}
      {activeTab === "Budget" && <BudgetPage />}
    </div>
  );
};

export default ClientComponent;
