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
import { useProjectControl } from '@/contexts/ProjectContext'

const Paths = () => {
    const pathname = usePathname();
    const {project} = useProjectControl()
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {
            pathname.startsWith('/project-details')? 
                <Link href="/project-details">Project-Details</Link>:
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
