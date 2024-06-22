"use client"

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProjectDetails } from "@/lib/react-query/queriesAndMutations";

const ProjectPage = ({params}: {params: {id: string;}}) => {
  // const res = await fetch(`https://sv-aibackend.azurewebsites.net/api/project/complete-project-details/?project_id=${params.id}`)
  // const projectDetails = await res.json()

  const {data: projectDetails, isLoading} = useProjectDetails(params.id);

  if(isLoading){
    return(
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center  min-h-screen py-2 w-full h-full">
      <Card className="relative w-full h-full p-6 bg-white shadow-lg rounded-xl overflow-auto">
        <div className="sm:hidden absolute right-2 bottom-2">
          {
            projectDetails.status === "completed" ? <div className="text-green-500 font-bold">COMPLETED</div> : <div className="text-red-500 font-bold">PENDING</div>
          }
        </div>
        <CardHeader className="flex flex-row flex-wrap-reverse justify-between">
          <CardTitle className="sm:text-3xl font-bold text-gray-900 dark:text-white">
            {projectDetails.project_name}
          </CardTitle>
          {
            projectDetails.status === "completed" ? <div className="hidden sm:block text-green-500 font-bold">COMPLETED</div> : <div className="hidden sm:block text-red-500 font-bold">PENDING</div>
          }
        </CardHeader>
        <CardContent className="font-sans p-0 flex flex-col gap-2 mt-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Content Type: 
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-200">
              {projectDetails.content_type}
            </p>
          </div>
          <div >
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Description
            </h2>
            <CardDescription className="text-base text-gray-600 dark:text-gray-200">
              {projectDetails.description}
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Budget:
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-200">
              {projectDetails.budget}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">Location: </h2>
            {
              projectDetails.location_details.length>0 && (<div className="text-base text-gray-600 dark:text-gray-200 flex">{projectDetails.location_details.map((item:any)=>(<p key={item.location}>{item.location}, &nbsp;</p>))}</div>)
            }
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Additional Details
            </h2>
            <CardDescription className="text-base text-gray-600 dark:text-gray-200">
              {projectDetails.additional_details}
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectPage;
