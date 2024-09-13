"use client";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { Fragment } from "react";
import { Project } from "@/types/project";
import LoadingSkeleton from "./LoadingSkeleton";

type Props = {
  projects: Project[];
  isLoading: boolean;
  isError: boolean;
};
const OngoingProjects = ({ projects, isLoading, isError }: Props) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <p className=" mt-8 text-center text-red-500">Failed to get your project</p>;
  }

  return (
    <>
      {projects?.length === 0 && (
        <h1 className=" mt-8 text-center">You don&apos;t have any ongoing project</h1>
      )}
      {projects?.map((project: Project) => (
        <Link key={project.project_id} href={`/project-details/${project.project_id}`}>
          <Card className="px-4 mt-4 flex justify-between cursor-pointer font-semibold shadow">
            <h2 className="w-[70%]">{project.name}</h2>
            <div>
              <h2 className="text-xs font-normal text-gray-700">{project.status}</h2>
            </div>
          </Card>
        </Link>
      ))}
    </>
  );
};

export default OngoingProjects;
