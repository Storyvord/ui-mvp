"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useProjectControl } from "@/context/ProjectContext";

const Paths = () => {
  const pathname = usePathname();
  const { project } = useProjectControl();
  const pathArray = pathname.split("/");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {pathname.startsWith("/project-details") ? (
            <Link href={`/project-details/${pathArray[2]}`}>Project-Details</Link>
          ) : (
            <Link href="/dashboard/home">Dashboard</Link>
          )}
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        {pathname.startsWith("/project-details") ? (
          <>
            <BreadcrumbPage className="Capitalize">{project.name}</BreadcrumbPage>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbPage className="Capitalize">{pathArray[3]}</BreadcrumbPage>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbPage className="Capitalize">{pathArray[4]}</BreadcrumbPage>
          </>
        ) : (
          <BreadcrumbPage className="Capitalize">{pathArray[2]}</BreadcrumbPage>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Paths;
