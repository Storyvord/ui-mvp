import NavBar from "@/components/navbar/NavBar";
import SideBar from "@/components/sidebar/SideBar";
import { FC, ReactNode } from "react";

import ProjectContextProvider from "@/context/ProjectContext";
import SideBarContextProvider from "@/context/SideBarContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-[#eceff180] relative">
      <SideBarContextProvider>
        <ProjectContextProvider>
          <main className="max-w-[2000px] mx-auto min-h-screen">
            <SideBar />
            <div className="lg:ml-72 ">
              <NavBar />
              {children}
            </div>
          </main>
        </ProjectContextProvider>
      </SideBarContextProvider>
    </div>
  );
};

export default Layout;
