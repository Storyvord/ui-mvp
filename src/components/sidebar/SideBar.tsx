'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
    CreateProject,
    Dashboard,
 } from './components/Sidebaricons'
import ProjectButtonGroup from './components/ProjectButtonGroup'
import SideBarButton from './components/SideBarButton'
import SideBarCloseButton from './components/SideBarCloseButton'
import { useSideBarControl } from '@/contexts/SideBarContext'
import { useProjectControl } from '@/contexts/ProjectContext'
import { projectdetailsItems } from '@/constants'

// import Page from './components/crew/page';


const SideBar = () => {

    const {isSideBarOpen} = useSideBarControl()

    const ProjectDetailsMenu = projectdetailsItems.map((details)=>(
        <div key={details.title} className='flex flex-col gap-1'>
            <h1 className=" pl-2 text-sm text-gray-400 mt-4 uppercase">
                {details.title}
            </h1>
            {
                details.items.map((item)=>(
                    <li key={item.text} className='list-none'>
                        <SideBarButton Icon={item.icon} link={item.link} root='project-details' text={item.text}/>
                    </li>
                ))
            }
        </div>
        
    ))

    const {setProject} = useProjectControl()

  return (
    <aside className={`${isSideBarOpen ? 'translate-x-0' : '-translate-x-80'} overflow-y-auto bg-white shadow-sm fixed inset-0 z-50 h-100vh w-72 transition-transform duration-300 lg:translate-x-0 border border-blue-gray-100`}>
        <div className="relative">
            <SideBarCloseButton/>
            <Link className=" mt-4" href="/">
                <Image onClick={()=>setProject({id:"", name:""})} className=" mx-auto w-[150px] pt-4 mb-8 " src="/logo-a6299cea.png" width={150} height={78} alt=""/>
            </Link>
        </div>
        <div className='m-4'>
            <ul className='mb-4 flex flex-col gap-1'>
                <li>
                    <SideBarButton Icon={Dashboard} text='dashboard' link='home' root='dashboard'/>
                </li>
                <li>
                    <SideBarButton Icon={CreateProject} text='Create Project' link='new-project' root='dashboard'/>
                </li>
                <li>
                    <SideBarButton Icon={CreateProject} text='Crew-Page' link='crew-page' root='dashboard'/>
                </li>
                {/* <li><Page/></li> */}
            </ul>
            <ProjectButtonGroup>
                {ProjectDetailsMenu}
            </ProjectButtonGroup>
        </div>
    </aside>
  )
}

export default SideBar
