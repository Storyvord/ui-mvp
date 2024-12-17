"use client";
import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useEditProjectDetails,
  useEditProjectRequirements,
  useEditShootDetails,
  useGetProjectDetails,
  useGetProjectRequirements,
  useGetShootDetails,
} from "@/lib/react-query/queriesAndMutations/project";
import { useToast } from "@/components/ui/use-toast";
import CreateProjectPage from "@/components/user-dashboard/dashboard/CreateProjectForm";

const EditProjectContent = () => {
  // Retrieve query parameters from the URL, specifically the 'projectId'.
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId") || "";
  const router = useRouter();
  const { toast } = useToast();

  // Fetch project details using the projectId.
  const { data, isPending: projectDetailsLoading, isError } = useGetProjectDetails(projectId);
  const { data: projectRequirements } = useGetProjectRequirements(projectId);
  const { data: shootDetails } = useGetShootDetails(projectId);

  // Mutation hook to edit a project, using the projectId.
  const {
    mutateAsync: editProjectDetails,
    isPending: isLoadingEditProject,
    isError: isErrorEditProject,
  } = useEditProjectDetails(projectId);
  const { mutateAsync: editShootDetails } = useEditShootDetails(projectId);
  const { mutateAsync: editProjectRequirements } = useEditProjectRequirements(
    projectRequirements?.results[0]?.id
  );

  // Handler function to edit a project with the provided project data.
  const handleEditProject = async (projectData: any) => {
    try {
      // Run all three async calls in parallel using Promise.all
      await Promise.all([
        editProjectDetails({
          projectData: projectData.project_details,
          projectId,
        }),
        editShootDetails({
          shootDetails: projectData.shooting_details,
          projectId,
        }),
        editProjectRequirements({
          requirementData: projectData.project_requirement,
          reqId: projectRequirements?.results[0]?.id,
        }),
      ]);
      toast({ title: "Project has been successfully updated" });
      router.push(`/project-details/${projectId}`);
      return "success";
    } catch (error) {
      toast({ title: "Failed to update Project", variant: "destructive" });
      console.error("Error updating project:", error);
      return "error";
    }
  };

  // Map the fetched project data to the format required by the form.
  const projectDetails = {
    projectName: data?.name,
    contentType: data?.content_type,
    description: data?.brief,
    budget: projectRequirements?.results[0].budget_amount, // Convert budget amount to a float.
    locationDetails: shootDetails?.results.map((location: any) => ({
      location: location.location,
      start_date: location.start_date,
      end_date: location.end_date,
      permits: location.permits,
      mode_of_shooting: location.mode_of_shooting,
    })),
    uploadedDocument: data?.documents,
    aiSuggestions: data?.ai_suggestions,
    crew: projectRequirements?.results[0]?.crew_requirements?.map(
      (crew: { crew_title: string; quantity: number }) => ({
        title: crew.crew_title,
        quantity: crew.quantity,
      })
    ),
    equipment: projectRequirements?.results[0]?.equipment_requirements?.map(
      (item: { equipment_title: string; quantity: number }) => ({
        title: item.equipment_title,
        quantity: item.quantity,
      })
    ),
  };

  return (
    <div>
      {/* Render the CreateProjectPage component with the required props for editing */}
      <CreateProjectPage
        projectDetails={projectDetails}
        isEdit={true} // Indicates that this is an edit operation.
        handleEditProject={handleEditProject} // Pass the edit handler function.
        isLoadingEditProject={isLoadingEditProject} // Loading state for the edit operation.
        isErrorEditProject={isErrorEditProject} // Error state for the edit operation.
      />
    </div>
  );
};

const EditProject = () => (
  <Suspense fallback={<div className=" w-full p-4 mt-4 text-center">Loading data....</div>}>
    <EditProjectContent />
  </Suspense>
);

export default EditProject;
