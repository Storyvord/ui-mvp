import SideBar from "@/components/sidebar/SideBar";
import { FC, ReactNode } from "react";

import ProjectContextProvider from "@/context/ProjectContext";
import SideBarContextProvider from "@/context/SideBarContext";
import ProjectDetailsNavBar from "@/components/user-dashboard/project-details/ProjectDetailsNavBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen md:bg-[#eceff180] bg-white relative">
      <SideBarContextProvider>
        <ProjectContextProvider>
          <main className="max-w-[2000px] mx-auto min-h-screen">
            <ProjectDetailsNavBar />
            <div className="md:ml-60 lg:ml-72 md:pt-16 pt-32">
              <SideBar />
              {children}
            </div>
          </main>
        </ProjectContextProvider>
      </SideBarContextProvider>
    </div>
  );
};

export default Layout;
