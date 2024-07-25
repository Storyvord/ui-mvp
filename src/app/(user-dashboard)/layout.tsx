"use client"
import React, { FC } from 'react';
import SideBar from "@/components/sidebar/SideBar";
import NavBar from "@/components/navbar/NavBar";
import { SideBarContextProvider } from "@/context/SideBarContext";
import { ProjectContextProvider } from "@/context/ProjectContext";
import { UserProvider } from '@/context/UserContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {


  return (
    <UserProvider>
      <div className='w-full min-h-screen bg-[#eceff180] relative'>
        <SideBarContextProvider>
          <ProjectContextProvider>
            <SideBar />
            <div className= "p-4 lg:ml-80">
              <NavBar />
              {children}
            </div>
          </ProjectContextProvider>
        </SideBarContextProvider>
      </div>
    </UserProvider>
    
  );
}

export default Layout;