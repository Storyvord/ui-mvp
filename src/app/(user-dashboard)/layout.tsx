"use client"
import React, { FC } from 'react';
import { usePathname } from 'next/navigation';
import SideBar from "@/components/sidebar/SideBar";
import NavBar from "@/components/navbar/NavBar";
import { SideBarContextProvider } from "@/context/SideBarContext";
import { ProjectContextProvider } from "@/context/ProjectContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith('/auth');

  return (
    <div className='w-full min-h-screen bg-[#eceff180] relative'>
      <SideBarContextProvider>
        <ProjectContextProvider>
          {!isAuthPage && <SideBar />}
          <div className={isAuthPage ? "p-4" : "p-4 lg:ml-80"}>
            {!isAuthPage && <NavBar />}
            {children}
          </div>
        </ProjectContextProvider>
      </SideBarContextProvider>
    </div>
  );
}

export default Layout;