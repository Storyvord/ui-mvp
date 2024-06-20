import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const page = async ({params}: {params: {id: string;}}) => {
  const res = await fetch(`https://sv-aibackend.azurewebsites.net/api/project/complete-project-details/?project_id=${params.id}`)
  const projectDetails = await res.json()

  return (
    <div className="flex flex-col items-center  min-h-screen py-2 w-full h-full">
      <Card className="w-full h-full p-6 bg-white shadow-lg rounded-xl overflow-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">{projectDetails.project_name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Content Type</h2>
            <p className="text-base text-gray-600 dark:text-gray-200">{projectDetails.content_type}</p>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Budget</h2>
            <p className="text-base text-gray-600 dark:text-gray-200">{projectDetails.budget}</p>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Description</h2>
            <CardDescription className="text-base text-gray-600 dark:text-gray-200">{projectDetails.description}</CardDescription>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Additional Details</h2>
            <CardDescription className="text-base text-gray-600 dark:text-gray-200">{projectDetails.additional_details}</CardDescription>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Location</h2>
            {
              projectDetails.locations && (<p className="text-base text-gray-600 dark:text-gray-200">{projectDetails.locations[0]}</p>)
            }
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
