import React, { FC, Suspense } from "react";
import SideBar from "@/components/sidebar/SideBar";
import NavBar from "@/components/navbar/NavBar";
import { Toaster } from "@/components/ui/toaster";

import SideBarContextProvider from "@/context/SideBarContext";
import UserContextProvider from "@/context/UserContext";
import ProjectContextProvider from "@/context/ProjectContext";
import Loading from "./loading";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <UserContextProvider>
      <div className="w-full min-h-screen bg-[#eceff180] relative">
        <SideBarContextProvider>
          <ProjectContextProvider>
            <SideBar />
            <div className="lg:ml-72 font-sans">
              <NavBar />
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
            <Toaster />
          </ProjectContextProvider>
        </SideBarContextProvider>
      </div>
    </UserContextProvider>
  );
};

export default Layout;
