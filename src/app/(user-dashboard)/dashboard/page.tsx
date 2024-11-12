"use client";
import React, { useEffect, useState } from "react";
import Posting from "@/components/user-dashboard/dashboard/posting/Posting";
import Project from "@/components/user-dashboard/dashboard/project/Project";
import Tasks from "@/components/user-dashboard/dashboard/tasks/Tasks";
import MyNetwork from "@/components/user-dashboard/dashboard/network/MyNetwork";
import CalendarSection from "@/components/user-dashboard/dashboard/calendar/CalendarSection";
import PastProjects from "@/components/dashboardHome/PastProjects";
import { useGetProjects } from "@/lib/react-query/queriesAndMutations/project";
import { Project as ProjectType } from "@/types/project";

const Dashboard = () => {
  const { data: projects, isPending, isError } = useGetProjects();
  const [pastProjects, setPastProjects] = useState<ProjectType[]>([]);
  const [onGoingProjects, setOngoingProjects] = useState<ProjectType[]>([]);

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

  return (
    <main className=" p-4 sm:py-6 sm:px-10 border border-red-500">
      <h1 className="text-xl md:text-2xl font-semibold">Dashboard</h1>
      <div className=" grid grid-cols-1 md:grid-cols-4">
        <section className="md:col-span-3 h-full py-3 pr-2">
          <Project onGoingProjects={onGoingProjects} />
          <Posting />
          <CalendarSection />
        </section>
        <section className=" h-full pl-1 space-y-6">
          <Tasks />
          <MyNetwork />
        </section>
      </div>
      <PastProjects projects={pastProjects} isLoading={isPending} isError={isError} />
    </main>
  );
};

export default Dashboard;
