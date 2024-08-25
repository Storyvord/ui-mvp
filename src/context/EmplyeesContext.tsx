"use client"; // Add this line at the top

import React, { createContext, useContext, useState, ReactNode } from "react";
import { EmplyeesFormData } from "@/components/user-dashboard/dashboard/company-settings/emplyees/types";

interface EmplyeesContextType {
  submittedData: EmplyeesFormData | null;
  setSubmittedData: React.Dispatch<React.SetStateAction<EmplyeesFormData | null>>;
}

const EmplyeesContext = createContext<EmplyeesContextType | undefined>(undefined);

export const EmplyeesProvider = ({ children }: { children: ReactNode }) => {
  const [submittedData, setSubmittedData] = useState<EmplyeesFormData | null>(null);

  return (
    <EmplyeesContext.Provider value={{ submittedData, setSubmittedData }}>
      {children}
    </EmplyeesContext.Provider>
  );
};

export const useFormData = () => {
  const context = useContext(EmplyeesContext);
  if (!context) {
    throw new Error("useFormData must be used within an AdminFormDataProvider");
  }
  return context;
};
