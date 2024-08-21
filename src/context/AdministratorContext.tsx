"use client"; // Add this line at the top

import React, { createContext, useContext, useState, ReactNode } from "react";
import { AdministratorFormData } from "@/components/user-dashboard/dashboard/company-settings/emplyees/types";

interface AdministratorContextType {
  submittedData: AdministratorFormData | null;
  setSubmittedData: React.Dispatch<React.SetStateAction<AdministratorFormData | null>>;
}

const AdministratorContext = createContext<AdministratorContextType | undefined>(undefined);

export const AdminFormDataProvider = ({ children }: { children: ReactNode }) => {
  const [submittedData, setSubmittedData] = useState<AdministratorFormData | null>(null);

  return (
    <AdministratorContext.Provider value={{ submittedData, setSubmittedData }}>
      {children}
    </AdministratorContext.Provider>
  );
};

export const useFormData = () => {
  const context = useContext(AdministratorContext);
  if (!context) {
    throw new Error("useFormData must be used within an AdminFormDataProvider");
  }
  return context;
};
