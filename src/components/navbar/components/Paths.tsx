"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { useProjectControl } from '@/context/ProjectContext'

const Paths = () => {
    const pathname = usePathname();
    const {project} = useProjectControl()
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {
            pathname.startsWith('/project-details')? 
                <span >Project-Details</span>:
                <Link href="/dashboard/home">Dashboard</Link>      
          }
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          /
        </BreadcrumbSeparator>
        {
          (pathname.startsWith('/project-details') && project.id) &&
            (<BreadcrumbPage className='Capitalize'>{project.name}</BreadcrumbPage>)
        }
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Paths
