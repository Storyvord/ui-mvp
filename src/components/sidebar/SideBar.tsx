'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Report, File, Tasks, Announcements,
    Crew, Suppliers, Compliance, Budget, CallSheet, Calender,
    Script,
    Scenes,
    Shots,
    Storyboard,
    ContentItems,
    Cast,
    Costumes,
    Makeup,
    Locations,
    Production,
    CreateProject,
    Dashboard,

 } from './components/Sidebaricons'
import ProjectButtonGroup from './components/ProjectButtonGroup'
import SideBarButton from './components/SideBarButton'
import SideBarCloseButton from './components/SideBarCloseButton'
import { useSideBarControl } from '@/contexts/SideBarContext'


type itemType = {
    text: string,
    link: string,
    icon: React.ReactNode,
}

type projectDetailItem = {
    title:string,
    items: itemType[],
}



const projectdetailsItems: projectDetailItem[] = [
    {
        title: "general",
        items: [
            {
                text: "reports",
                link: "reports",
                icon: <Report/>,
            },
            {
                text: "File & Documents",
                link: "file-documents",
                icon: <File/>,
            },
            {
                text: "tasks",
                link: "task",
                icon: <Tasks/>,
            },
            {
                text: "announcements",
                link: "announcements",
                icon: <Announcements/>,
            }
        ]
    },
    {
        title: "planning",
        items: [
            {
                text: "crew",
                link: "crew",
                icon: <Crew/>,
            },
            {
                text: "suppliers",
                link: "resource",
                icon: <Suppliers/>,
            },
            {
                text: "compliance",
                link: "compliance",
                icon: <Compliance/>,
            },
            {
                text: "budget",
                link: "budget",
                icon: <Budget/>,
            },
            {
                text: "call sheets",
                link: "call-sheets",
                icon: <CallSheet/>,
            },
            {
                text: "calender",
                link: "calender",
                icon: <Calender/>,
            }
        ]
    },
    {
        title: "breakdowns & more",
        items: [
            {
                text: "script",
                link: "script",
                icon: <Script/>,
            },
            {
                text: "scenes",
                link: "scenes",
                icon: <Scenes/>,
            },
            {
                text: "shots",
                link: "shots",
                icon: <Shots/>,
            },
            {
                text: "storyboard",
                link: "storyboard",
                icon: <Storyboard/>,
            },
            {
                text: "content items",
                link: "content-items",
                icon: <ContentItems/>,
            }
        ]
    },
    {
        title: "department specific",
        items: [
            {
                text: "cast",
                link: "cast",
                icon: <Cast/>,
            },
            {
                text: "costumes",
                link: "costumes",
                icon: <Costumes/>,
            },
            {
                text: "makeup & hair",
                link: "makeup-hair",
                icon: <Makeup/>,
            },
            {
                text: "locations & sets",
                link: "locations-sets",
                icon: <Locations/>,
            },
            {
                text: "production design",
                link: "production-design",
                icon: <Production/>,
            }
        ]
    },
    
]

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
                        <SideBarButton icon={item.icon} link={item.link} root='project-details' text={item.text}/>
                    </li>
                ))
            }
        </div>
        
    ))
  return (
    <aside className={`${isSideBarOpen ? 'translate-x-0' : '-translate-x-80'} overflow-y-auto bg-white shadow-sm fixed inset-0 z-50 h-100vh w-72 transition-transform duration-300 lg:translate-x-0 border border-blue-gray-100`}>
        <div className="relative">
            <SideBarCloseButton/>
            <Link className=" mt-4" href="/">
                <Image className=" mx-auto w-[150px] pt-4 mb-8 " src="/logo-a6299cea.png" width={150} height={78} alt=""/>
            </Link>
        </div>
        <div className='m-4'>
            <ul className='mb-4 flex flex-col gap-1'>
                <li>
                    <SideBarButton icon={<Dashboard/>} text='dashboard' link='home' root='dashboard'/>
                </li>
                <li>
                    <SideBarButton icon={<CreateProject/>} text='Create Project' link='new-project' root='dashboard'/>
                </li>
            </ul>
            <ProjectButtonGroup>
                {ProjectDetailsMenu}
            </ProjectButtonGroup>
        </div>
    </aside>
  )
}

export default SideBar
