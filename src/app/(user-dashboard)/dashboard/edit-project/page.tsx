"use client";
import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useEditProject,
  useGetProjectDetails,
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
  const { data } = useGetProjectDetails(projectId);
  // Mutation hook to edit a project, using the projectId.
  const {
    mutateAsync: editProject,
    isPending: isLoadingEditProject,
    isError: isErrorEditProject,
  } = useEditProject(projectId);

  // Handler function to edit a project with the provided project data.
  const handleEditProject = async (projectData: any) => {
    try {
      // Attempt to update the project with the given data.
      const res = await editProject({ projectData, projectId });
      if (res) {
        // Show a success toast message if the project is updated successfully.
        toast({ title: "Project has been successfully updated" });
        // Redirect to the project details page after a successful update.
        router.push(`/project-details/${projectId}`);
      }
    } catch (e) {
      // Show an error toast message if the update fails.
      toast({ title: "Failed to update Project", variant: "destructive" });
    }
  };

  // Map the fetched project data to the format required by the form.
  const projectDetails = {
    projectName: data?.name,
    contentType: data?.content_type,
    budget: parseFloat(data?.budget_amount), // Convert budget amount to a float.
    description: data?.brief,
    locationDetails: data?.location_details.map((location: any) => ({
      location: location.location,
      start_date: location.start_date,
      end_date: location.end_date,
      permits: location.permits,
      mode_of_shooting: location.mode_of_shooting,
    })),
    uploadedDocument: data?.uploaded_document,
    aiSuggestions: data?.ai_suggestions,
    crew: data?.selected_crew.map((crew: { title: string; quantity: number }) => ({
      title: crew.title,
      quantity: crew.quantity,
    })),
    equipment: data?.equipment.map((item: { title: string; quantity: number }) => ({
      title: item.title,
      quantity: item.quantity,
    })),
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
