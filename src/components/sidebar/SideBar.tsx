"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
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

 } from './sidebaricons'

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
                link: "",
                icon: <Report/>,
            },
            {
                text: "File & Documents",
                link: "",
                icon: <File/>,
            },
            {
                text: "tesks",
                link: "",
                icon: <Tasks/>,
            },
            {
                text: "announcements",
                link: "",
                icon: <Announcements/>,
            }
        ]
    },
    {
        title: "planning",
        items: [
            {
                text: "crew",
                link: "",
                icon: <Crew/>,
            },
            {
                text: "suppliers",
                link: "",
                icon: <Suppliers/>,
            },
            {
                text: "compliance",
                link: "",
                icon: <Compliance/>,
            },
            {
                text: "budget",
                link: "",
                icon: <Budget/>,
            },
            {
                text: "call sheets",
                link: "",
                icon: <CallSheet/>,
            },
            {
                text: "calender",
                link: "",
                icon: <Calender/>,
            }
        ]
    },
    {
        title: "breakdowns & more",
        items: [
            {
                text: "script",
                link: "",
                icon: <Script/>,
            },
            {
                text: "scenes",
                link: "",
                icon: <Scenes/>,
            },
            {
                text: "shots",
                link: "",
                icon: <Shots/>,
            },
            {
                text: "storyboard",
                link: "",
                icon: <Storyboard/>,
            },
            {
                text: "content items",
                link: "",
                icon: <ContentItems/>,
            }
        ]
    },
    {
        title: "department specific",
        items: [
            {
                text: "cast",
                link: "",
                icon: <Cast/>,
            },
            {
                text: "costumes",
                link: "",
                icon: <Costumes/>,
            },
            {
                text: "makeup & hair",
                link: "",
                icon: <Makeup/>,
            },
            {
                text: "locations & sets",
                link: "",
                icon: <Locations/>,
            },
            {
                text: "production design",
                link: "",
                icon: <Production/>,
            }
        ]
    },
    
]
const SideBar = () => {
    const pathname = usePathname()
    const isSpecificRoute = () => {
        // Example: Check if the current route is '/peoject-details' or its children
        return pathname.startsWith('/project-details');
    };

    const ProjectDetailsMenu = projectdetailsItems.map((project)=>(
        <div key={project.title}>
            <h1 className=" pl-2 text-sm text-gray-400 mt-4 uppercase">
                {project.title}
            </h1>
            {
                project.items.map((item)=>(
                    <li key={item.text} className='list-none'>
                        <Link className={`${pathname === item.link ? 'active' : ''}`} href={item.link}>
                            <Button variant="ghost" 
                                className={`${pathname === item.link ? 'bg-gradient-to-tr from-gray-900 to-gray-800 text-white hover:text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]' 
                                : 'text-[#607D8B] hover:bg-[#607D8B]/10 active:bg-[#607D8B]/30'} w-full h-auto flex items-center gap-4 px-4 py-3 capitalize justify-start`}>
                                {
                                    item.icon
                                }
                                <p className="block font-sans antialiased text-base leading-relaxed text-inherit font-medium capitalize">
                                    {item.text}
                                </p>
                            </Button>
                        </Link>
                    </li>
                ))
            }
        </div>
        
    ))
  return (
    <aside className="overflow-y-auto bg-white shadow-sm -translate-x-80 fixed inset-0 z-50 h-100vh w-72 transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100">
        <div className="relative">
            <Link className=" mt-4" href="/">
                <Image className=" mx-auto w-[150px] pt-4 mb-8 " src="/logo-a6299cea.png" width={150} height={78} alt=""/>
            </Link>
        </div>
        <div className='m-4'>
            <ul className='mb-4 flex flex-col gap-1'>
                <li>
                    <Link className={`${pathname === '/dashboard/home' ? 'active' : ''}`} href="/dashboard/home">
                        <Button variant="ghost" 
                            className={`${pathname === '/dashboard/home' ? 'bg-gradient-to-tr from-gray-900 to-gray-800 text-white hover:text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]' 
                            : 'text-[#607D8B] hover:bg-[#607D8B]/10 active:bg-[#607D8B]/30'} w-full h-auto flex items-center gap-4 px-4 py-3 capitalize justify-start`}>
                            <Dashboard/>
                            <p className="block font-sans antialiased text-base leading-relaxed text-inherit font-medium capitalize">
                                dashboard
                            </p>
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link className={`${pathname === '/dashboard/new-project' ? 'active' : ''}`} href="/dashboard/new-project">
                        <Button variant="ghost" 
                            className={`${pathname === '/dashboard/new-project' ? 'bg-gradient-to-tr from-gray-900 to-gray-800 text-white hover:text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]' 
                            : 'text-[#607D8B] hover:bg-[#607D8B]/10 active:bg-[#607D8B]/30'} w-full h-auto flex items-center gap-4 px-4 py-3 capitalize justify-start`}>
                            <CreateProject/>
                            <p className="block font-sans antialiased text-base leading-relaxed text-inherit font-medium capitalize">
                                Create Project
                            </p>
                        </Button>
                    </Link>
                </li>
            </ul>
            {
                isSpecificRoute() && (
                    ProjectDetailsMenu
                )
            }
        </div>
    </aside>
  )
}

export default SideBar
