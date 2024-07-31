import React, { FC } from "react";
import SideBar from "@/components/sidebar/SideBar";
import NavBar from "@/components/navbar/NavBar";

import SideBarContextProvider from "@/context/SideBarContext";
import UserContextProvider from "@/context/UserContext";
import ProjectContextProvider from "@/context/ProjectContext";

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
            <div className="lg:ml-72">
              <NavBar />
              {children}
            </div>
          </ProjectContextProvider>
        </SideBarContextProvider>
      </div>
    </UserContextProvider>
  );
};

export default Layout;
