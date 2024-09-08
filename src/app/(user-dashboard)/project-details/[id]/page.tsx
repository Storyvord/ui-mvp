"use client";

import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Select from "react-select";
import { BsThreeDotsVertical } from "react-icons/bs";
import LoadingPage from "@/components/projectdetails/LoadingPage";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { useParams, useRouter } from "next/navigation";
import { useProjectControl } from "@/context/ProjectContext";
import {
  useDeleteProject,
  useEditProject,
  useGetProjectDetails,
} from "@/lib/react-query/queriesAndMutations/project";
import Loader from "@/components/Loader";
import { Crew, Equipment, ProjectStatus } from "@/types/project";

const projectStatuses = [
  { value: "PLANNING", label: "PLANNING" },
  { value: "IN_PROGRESS", label: "IN_PROGRESS" },
  { value: "COMPLETED", label: "COMPLETED" },
  { value: "CANCELLED", label: "CANCELLED" },
  { value: "PAUSED", label: "PAUSED" },
  { value: "DEVELOPMENT", label: "DEVELOPMENT" },
  { value: "PRE_PRODUCTION", label: "PRE_PRODUCTION" },
  { value: "POST_PRODUCTION", label: "POST_PRODUCTION" },
  { value: "RELEASED", label: "RELEASED" },
];

const ProjectPage = () => {
  const { id: projectId }: { id: string } = useParams();
  const router = useRouter();

  const {
    data: projectDetails,
    isLoading: projectDetailsLoading,
    isError,
  } = useGetProjectDetails(projectId);
  console.log(projectDetails);
  const { setProject } = useProjectControl();
  const { mutateAsync: deleteProject, isLoading: deletingProject } = useDeleteProject();
  const { mutateAsync: editProject } = useEditProject(projectId);

  useEffect(() => {
    setProject({ id: projectDetails?.project_id, name: projectDetails?.name });
  }, [projectDetails, setProject]);

  const handleDeleteProject = async () => {
    await deleteProject({ project_id: projectId });
    router.push("/dashboard/home");
  };

  const handleChangeStatus = async (status: ProjectStatus) => {
    const transformProject = { ...projectDetails, status };
    const res = await editProject(transformProject);
  };

  const [selectedStatus, setSelectedStatus] = useState(null);
  const handleChange = (selectedOption: any) => {
    setSelectedStatus(selectedOption);
    handleChangeStatus(selectedOption.value);
  };

  if (projectDetailsLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <div className="w-full text-center text-red-700 ">Failed to fetch project details</div>;
  }

  return (
    <div className="flex flex-col items-center gap-2 py-2 w-full h-auto px-4">
      <Card className="relative w-full h-full bg-white shadow-lg rounded-xl overflow-auto pt-2">
        <CardHeader className="sm:flex sm:flex-row-reverse sm:items-start sm:justify-between sm:space-y-0">
          <div className="flex gap-2 items-center justify-between sm:justify-end">
            <div className="flex items-center gap-2">
              <div>
                {projectDetails?.status === "COMPLETED" ? (
                  <div className="text-sm sm:text-base text-green-500 font-bold">COMPLETED</div>
                ) : (
                  <div className="text-sm sm:text-base text-yellow-500 font-bold">
                    {projectDetails.status}
                  </div>
                )}
              </div>
            </div>

            <Popover>
              <PopoverTrigger>
                <BsThreeDotsVertical className=" cursor-pointer w-4 h-4" />
              </PopoverTrigger>
              <PopoverContent className=" space-y-4 mr-6 w-fit">
                <Button
                  onClick={handleDeleteProject}
                  variant="outline"
                  className=" w-full text-gray-600"
                  disabled={deletingProject}
                >
                  {deletingProject ? <Loader /> : <MdDelete className=" w-6 h-6 text-red-500" />}
                </Button>
                <Select
                  options={projectStatuses}
                  placeholder="Change Status"
                  value={selectedStatus}
                  onChange={handleChange}
                />
              </PopoverContent>
            </Popover>
          </div>
          <CardTitle className="sm:text-3xl font-bold text-gray-900 dark:text-white float-left">
            {projectDetails?.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="font-sans p-0 flex flex-col gap-2 mt-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Content Type:
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-200">
              {projectDetails?.content_type}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Budget:
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-200">
              {projectDetails?.budget_amount}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Location:
            </h2>
            {projectDetails?.location_details?.length > 0 && (
              <div className="text-base text-gray-600 dark:text-gray-200 flex">
                {projectDetails?.location_details.map((item: any) => (
                  <p key={item.location}>{item.location}, &nbsp;</p>
                ))}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Crew List:
            </h2>
            <CardDescription className="text-base flex flex-wrap text-gray-600 dark:text-gray-200">
              {projectDetails.selected_crew.map((crew: Crew) => (
                <p key={crew.id} className="min-w-fit">
                  {crew.title}, &nbsp;
                </p>
              ))}
            </CardDescription>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Equipment List:
            </h2>
            <CardDescription className="text-base flex flex-wrap text-gray-600 dark:text-gray-200">
              {projectDetails.equipment.map((equipment: Equipment) => (
                <p key={equipment.id} className="min-w-fit">
                  {equipment.title}, &nbsp;
                </p>
              ))}
            </CardDescription>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Description
            </h2>
            <CardDescription className="text-base text-gray-600 dark:text-gray-200">
              {projectDetails?.brief}
            </CardDescription>
          </div>
        </CardContent>
      </Card>
      <div className="w-full h-auto mt-5">
        {/* <SelectedCrew
          project_id={projectDetails?.project_id}
          status={projectDetails?.status}
        /> */}
      </div>
    </div>
  );
};

export default ProjectPage;
