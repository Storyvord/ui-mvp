"use client";
import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { Project as ProjectType } from "@/types/project";
import { useGetProjects } from "@/lib/react-query/queriesAndMutations/project";
import { Button } from "@/components/ui/button";

const Project = () => {
  const { data: projects, isPending, isError } = useGetProjects();
  const [pastProjects, setPastProjects] = useState<ProjectType[]>([]);
  const [onGoingProjects, setOngoingProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    if (projects) {
      // Filter past projects based on their status
      const filteredPastProjects = projects.filter((project: ProjectType) =>
        ["COMPLETED", "CANCELLED", "POST_PRODUCTION"].includes(project.status)
      );

      // Filter ongoing projects based on their status
      const filteredOngoingProjects = projects.filter(
        (project: ProjectType) =>
          !["COMPLETED", "CANCELLED", "POST_PRODUCTION"].includes(project.status)
      );

      // Set state with filtered projects
      setPastProjects(filteredPastProjects);
      setOngoingProjects(filteredOngoingProjects);
    }
  }, [projects]);

  console.log(onGoingProjects);

  return (
    <section>
      <header className=" flex justify-between">
        <span className=" flex items-center gap-3 mb-4">
          <img src="/icons/project-2.svg" alt="" />
          <h1 className=" text-xl">Your Projects</h1>
        </span>
        <Link href="/dashboard/new-project">
          <Button className=" md:hidden flex gap-2" size="sm">
            <img src="/icons/plus-2.svg" alt="" /> New Project
          </Button>
        </Link>
      </header>
      <main
        className="w-full overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex gap-6 w-max scrollbar-hide">
          <Link
            href="/dashboard/new-project"
            className="w-80 border rounded-2xl p-4 bg-white hidden md:flex flex-col gap-4 cursor-pointer"
          >
            <img width={30} src="/icons/plus.svg" alt="plus icon" />
            <span>
              <h2 className="font-semibold text-lg mb-1">Create New Project</h2>
              <p>
                A project is a work order between you and a creator. Start a project directly with a
                creator, or put up a posting to hire from the marketplace.
              </p>
            </span>
          </Link>
          {onGoingProjects.map((project) => (
            <Link key={project.project_id} href={`/project-details/${project.project_id}`}>
              <ProjectCard key={project.project_id} name={project.name} status={project.status} />
            </Link>
          ))}
        </div>
      </main>
    </section>
  );
};

export default Project;
