"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useCompleteProject,
  useDeleteProject,
  useProjectDetails,
} from "@/lib/react-query/queriesAndMutations";
import SelectedCrew from "@/components/projectdetails/SelectedCrew";
import LoadingPage from "@/components/projectdetails/LoadingPage";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MdDelete } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";

const ProjectPage = ({ params }: { params: { id: string } }) => {
  // const res = await fetch(`https://sv-aibackend.azurewebsites.net/api/project/complete-project-details/?project_id=${params.id}`)
  // const projectDetails = await res.json()
  // const [projectStatus, setProjectStatus] = useState("");
  const {
    data: projectDetails,
    isLoading: projectDetailsLoading,
    error,
  } = useProjectDetails(params.id);
  const { mutateAsync: deleteProject, isLoading: deletingProject } =
    useDeleteProject();
  const { mutateAsync: completeProject, isLoading: completingProject } =
    useCompleteProject(params.id);

  console.log(projectDetails);

  // useEffect(()=>{
  //     setProjectStatus(projectDetails ? projectDetails.status : "");
  // }, [projectDetails])
  const router = useRouter();
  const handleDeleteProject = async () => {
    await deleteProject({ project_id: params.id });
    router.push("/dashboard/home");
  };

  const handleCompleteProject = async () => {
    await completeProject({ project_id: params.id });
    // setProjectStatus("COMPLETED");
  };

  if (projectDetailsLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return (
      <div className="w-full text-center text-gray-700">
        Failed to fetch project details
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 py-2 w-full h-auto">
      {/* <div className="w-full flex flex-wrap gap-3 justify-between">
        <Button variant="destructive" className="font-bold w-full xsm:w-auto">
           DELETE PROJECT
        </Button>
        <Button className="bg-green-500 hover:bg-green-400 active:bg-green-600 font-bold w-full xsm:w-auto">
           MARK AS COMPLETED
        </Button>
      </div> */}
      <Card className="relative w-full h-full bg-white shadow-lg rounded-xl overflow-auto pt-2">
        {/* <div className="sm:hidden absolute right-2 bottom-2">
          {projectDetails.status === "INITIALIZED" && <div className="text-gray-500 font-bold">INITIALIZED</div>}
          {projectDetails.status === "COMPLETED" && <div className="text-green-500 font-bold">COMPLETED</div>}
          {projectDetails.status === "PLANNING" && <div className="text-yellow-500 font-bold">PLANNING</div>}
        </div> */}
        <CardHeader className="sm:flex sm:flex-row-reverse sm:items-start sm:justify-between sm:space-y-0">
          <div className="flex gap-2 items-end justify-between sm:justify-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div>
                  <MdDelete className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 hover:text-red-400 cursor-pointer" />
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the project and remove your project data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button
                    onClick={handleDeleteProject}
                    className={`${deletingProject ? "disabled" : ""}`}
                  >
                    {deletingProject ? "Deleting..." : "Delete"}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    disabled={projectDetails?.status === "COMPLETED"}
                  >
                    <div onClick={handleCompleteProject}>
                      {completingProject ? (
                        <ReloadIcon className="h-5 w-5 animate-spin text-bold text-gray-500" />
                      ) : (
                        <GrStatusGood
                          className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer ${
                            projectDetails?.status === "COMPLETED"
                              ? "text-green-500"
                              : "text-gray-500"
                          }`}
                        />
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    className={`${
                      projectDetails?.status === "COMPLETED" ? "hidden" : ""
                    } bg-transparent shadow-none border-none`}
                  >
                    <p className="text-sm text-green-500 bold">
                      Mark Project As Completed
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div>
                {projectDetails?.status === "INITIATED" && (
                  <div className="text-sm sm:text-base text-gray-500 font-bold">
                    INITIALIZED
                  </div>
                )}
                {projectDetails?.status === "COMPLETED" && (
                  <div className="text-sm sm:text-base text-green-500 font-bold">
                    COMPLETED
                  </div>
                )}
                {projectDetails?.status === "PLANNING" && (
                  <div className="text-sm sm:text-base text-yellow-500 font-bold">
                    PLANNING
                  </div>
                )}
              </div>
            </div>
          </div>
          <CardTitle className="sm:text-3xl font-bold text-gray-900 dark:text-white float-left">
            {projectDetails?.project_name}
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
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Description
            </h2>
            <CardDescription className="text-base text-gray-600 dark:text-gray-200">
              {projectDetails?.description}
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Budget:
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-200">
              {projectDetails?.budget}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Location:{" "}
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
              Additional Details
            </h2>
            <CardDescription className="text-base text-gray-600 dark:text-gray-200">
              {projectDetails?.additional_details}
            </CardDescription>
          </div>
        </CardContent>
      </Card>
      <div className="w-full h-auto mt-5">
        <SelectedCrew crews={projectDetails?.selected_crews_set} />
      </div>
    </div>
  );
};

export default ProjectPage;
