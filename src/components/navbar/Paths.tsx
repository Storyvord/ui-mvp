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

const Paths = () => {
    const pathname = usePathname();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {
            pathname.startsWith('/dashboard')? 
                <Link href="/dashboard/home">Dashboard</Link> :
                <Link href="/project-details">Project-Details</Link>
          }
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          /
        </BreadcrumbSeparator>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Paths
