'use client'
import { createContext, useContext, useState } from "react";

const defaultCtx = {
  project: {
    id: "",
    name: ""
  },
  setProject: (project: {
    id:string,name:string
  }) => { },
}

const ProjectContext = createContext(defaultCtx)

export const ProjectContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [project, setProject] = useState<{ id: string, name: string }>({id:"", name:""})


  return (
    <ProjectContext.Provider value={{
      project, setProject,
    }}>
      {children}
    </ProjectContext.Provider>
  )
};

export const useProjectControl =()=> {
  const { project, setProject, } = useContext(ProjectContext);
  return { project, setProject, }
}
