import React from "react";
import ProjectCard from "./ProjectCard";
import Link from "next/link";

const Project = () => {
  return (
    <section>
      <span className=" flex items-center gap-3 mb-4">
        <img src="/icons/project-2.svg" alt="" />
        <h1 className=" text-xl">Your Projects</h1>
      </span>
      <main
        className="w-full overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex gap-6 w-max scrollbar-hide">
          <Link
            href="/dashboard/new-project"
            className="w-80 border rounded-2xl p-4 bg-white flex flex-col gap-4 cursor-pointer"
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
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </main>
    </section>
  );
};

export default Project;
