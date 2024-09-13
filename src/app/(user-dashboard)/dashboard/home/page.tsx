"use client";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import OngoingProjects from "@/components/dashboardHome/OngoingProjectCard";
import PastProjects from "@/components/dashboardHome/PastProjects";
import { useGetProjects } from "@/lib/react-query/queriesAndMutations/project";
import { Project } from "@/types/project";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { data: projects, isLoading, isError } = useGetProjects();
  const [pastProjects, setPastProjects] = useState<Project[]>([]);
  const [onGoingProjects, setOngoingProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (projects) {
      // Filter past projects based on their status
      const filteredPastProjects = projects.filter((project: Project) =>
        ["COMPLETED", "CANCELLED", "POST_PRODUCTION"].includes(project.status)
      );

      // Filter ongoing projects based on their status
      const filteredOngoingProjects = projects.filter(
        (project: Project) =>
          !["COMPLETED", "CANCELLED", "POST_PRODUCTION"].includes(project.status)
      );

      // Set state with filtered projects
      setPastProjects(filteredPastProjects);
      setOngoingProjects(filteredOngoingProjects);
    }
  }, [projects]);

  return (
    <div className="mt-12 lg:gap-16 gap-9 px-4">
      <div className="md:flex justify-between gap-4">
        <div className="md:w-96 mt-4 w-full">
          <Card className="flex justify-between cursor-pointer">
            <Link href="new-project" className="space-y-4 max-w-[70%] md:max-w-[85%]">
              <CardTitle>Create New Project</CardTitle>
              <CardDescription className="font-normal text-blue-gray-600 leading-5">
                Start a new project A preect is a work order between you and a creator. Start a
                project directly with a creator, or put up a posting to hire from the marketplace.
              </CardDescription>
            </Link>
            <span className="w-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                <path
                  fillRule="evenodd"
                  d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                  clipRule="evenodd"
                ></path>
                <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
              </svg>
            </span>
          </Card>
        </div>
        <Card className="md:w-96 w-full mt-8 md:mt-0 overflow-hidden overflow-y-auto h-[400px] ">
          <CardHeader>
            <CardTitle className="text-xl">Your Ongoing Projects</CardTitle>
          </CardHeader>
          <OngoingProjects projects={onGoingProjects} isLoading={isLoading} isError={isError} />
        </Card>
      </div>
      <PastProjects projects={pastProjects} isLoading={isLoading} isError={isError} />
    </div>
  );
};

export default Dashboard;
