"use client";
import React, { useEffect, useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { Project as ProjectType } from "@/types/project";
import { useGetProjects } from "@/lib/react-query/queriesAndMutations/project";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Project = () => {
  const { data: projects } = useGetProjects();
  const [pastProjects, setPastProjects] = useState<ProjectType[]>([]);
  const [onGoingProjects, setOngoingProjects] = useState<ProjectType[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Main container reference
  const scrollContentRef = useRef<HTMLDivElement>(null); // Inner div reference for project cards
  const [showArrows, setShowArrows] = useState(false); // State to toggle arrows

  useEffect(() => {
    if (projects) {
      const filteredPastProjects = projects.filter((project: ProjectType) =>
        ["COMPLETED", "CANCELLED", "POST_PRODUCTION"].includes(project.status)
      );
      const filteredOngoingProjects = projects.filter(
        (project: ProjectType) =>
          !["COMPLETED", "CANCELLED", "POST_PRODUCTION"].includes(project.status)
      );

      setPastProjects(filteredPastProjects);
      setOngoingProjects(filteredOngoingProjects);
    }
  }, [projects]);

  useEffect(() => {
    // Check if scrollable content is wider than the container
    if (
      scrollContainerRef.current &&
      scrollContentRef.current &&
      scrollContentRef.current.scrollWidth > scrollContainerRef.current.clientWidth
    ) {
      setShowArrows(true);
    } else {
      setShowArrows(false);
    }
  }, [onGoingProjects]);

  // Function to handle left scroll
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Function to handle right scroll
  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section>
      <header className="flex justify-between">
        <span className="flex items-center gap-3 mb-4">
          <img src="/icons/project-2.svg" alt="" />
          <h1 className="text-xl">Your Projects</h1>
        </span>
        <Link href="/dashboard/new-project">
          <Button className="md:hidden flex gap-2" size="sm">
            <img src="/icons/plus-2.svg" alt="" /> New Project
          </Button>
        </Link>
      </header>

      <main
        ref={scrollContainerRef}
        className="w-full overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div ref={scrollContentRef} className="flex gap-6 w-max scrollbar-hide">
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

      {showArrows && (
        <div className="flex justify-between">
          <Button onClick={handleScrollLeft} className="px-4 py-2" variant="ghost">
            <Image src="/icons/left-arrow.svg" alt="left arrow" width={12} height={12} />
          </Button>
          <Button onClick={handleScrollRight} className="px-4 py-2 rotate-180" variant="ghost">
            <Image src="/icons/left-arrow.svg" alt="right arrow" width={12} height={12} />
          </Button>
        </div>
      )}
    </section>
  );
};

export default Project;
