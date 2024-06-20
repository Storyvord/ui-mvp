import React, { FC } from 'react'
import SideBar from "@/components/sidebar/SideBar";
import NavBar from "@/components/navbar/NavBar";
import { SideBarContextProvider } from "@/context/SideBarContext";
import { ProjectContextProvider } from "@/context/ProjectContext";

interface layoutProps {
  children: React.ReactNode
}

const layout: FC<layoutProps> = ({children}) => {
  return (
    <div className='w-full min-h-screen bg-[#eceff180] relative'>
                <SideBarContextProvider>
                  <ProjectContextProvider>
                    <SideBar/>
                    <div className="p-4 lg:ml-80">
                      <NavBar/>
                      {children}
                    </div>
                  </ProjectContextProvider>
                </SideBarContextProvider> 
            </div>
)
}

export default layout