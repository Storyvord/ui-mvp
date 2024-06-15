import CrewPageClient from "@/components/reports/CrewPageClient";
import { CrewData, fetchCrewData } from "@/components/reports/crewService";
// import React, { useState, useEffect } from "react";
import Equipment from "./Equipment";
import Logistic from "./Logistics";
import Budget from "./Budget";
import Compliance from "./Compliance";

const CrewPage = async () => {
  let crewData: CrewData[] = [];

  try {
    crewData = await fetchCrewData(5); // Adjust this number as needed to fetch more entries
   
  } catch (error) {
    console.error("Failed to fetch crew data", error);
  }

  return <CrewPageClient crewData={crewData} />;
};

export default CrewPage;
