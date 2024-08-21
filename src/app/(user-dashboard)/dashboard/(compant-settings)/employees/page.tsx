import { Emplyees } from "@/components/user-dashboard/dashboard/company-settings/emplyees/Emplyees";
import { AdminFormDataProvider } from "@/context/AdministratorContext";
import { EmplyeesProvider } from "@/context/EmplyeesContext";
import React from "react";

const page = ({ Component, pageProps }: any) => {
  return (
    <div className="p-4">
      <AdminFormDataProvider>
        <EmplyeesProvider>
          <Emplyees {...pageProps} />
        </EmplyeesProvider>
      </AdminFormDataProvider>
    </div>
  );
};

export default page;
