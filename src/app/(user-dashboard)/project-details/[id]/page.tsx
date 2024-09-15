"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useProjectControl } from "@/context/ProjectContext";
import {
  useDeleteProject,
  useEditProjectStatus,
  useGetProjectDetails,
} from "@/lib/react-query/queriesAndMutations/project";

import LoadingPage from "@/components/projectdetails/LoadingPage";
import ProjectDetailsUI from "@/components/projectdetails/ProjectDetailsUI";

// Define available project statuses for selection
const projectStatuses = [
  { value: "COMPLETED", label: "COMPLETED" },
  { value: "CANCELLED", label: "CANCELLED" },
  { value: "PAUSED", label: "PAUSED" },
  { value: "PRE_PRODUCTION", label: "PRE_PRODUCTION" },
  { value: "POST_PRODUCTION", label: "POST_PRODUCTION" },
  { value: "RELEASED", label: "RELEASED" },
];

const ProjectDetails: React.FC = () => {
  // State to manage the selected project status
  const [selectedStatus, setSelectedStatus] = useState<{ value: string; label: string } | null>(
    null
  );

  // Get the project ID from the URL parameters
  const { id: projectId } = useParams<{ id: string }>();
  const router = useRouter();
  
  // Get the function to set the project in global context
  const { setProject } = useProjectControl();

  // Fetch project details, handle loading and error states
  const {
    data: projectDetails,
    isLoading: projectDetailsLoading,
    isError,
  } = useGetProjectDetails(projectId);

  // Mutation hook for deleting a project
  const { mutateAsync: deleteProject, isLoading: deletingProject } = useDeleteProject();

  // Mutation hook for editing project status
  const { mutateAsync: editProjectStatus } = useEditProjectStatus(projectId);

  // Set the project in the global state when project details are loaded
  useEffect(() => {
    if (projectDetails) {
      setProject({ id: projectDetails?.project_id, name: projectDetails?.name });
    }
  }, [projectDetails, setProject]);

  // Handle project deletion, redirect to home after successful deletion
  const handleDeleteProject = async () => {
    await deleteProject({ project_id: projectId });
    router.push("/dashboard/home");
  };

  // Handle status change for the project
  const handleChangeStatus = (selectedOption: any) => {
    setSelectedStatus(selectedOption); // Update local state with the selected status

    // Call mutation to update project status in the backend
    editProjectStatus({ status: selectedOption.value, projectId });
  };

  // Navigate to the edit form for the current project
  const handleEditForm = () => {
    router.push(`/dashboard/edit-project/?projectId=${projectId}`);
  };

  // Show loading page while project details are being fetched
  if (projectDetailsLoading) {
    return <LoadingPage />;
  }

  // Display error message if fetching project details fails
  if (isError) {
    return <div className="w-full text-center text-red-700">Failed to fetch project details</div>;
  }

  // Render the UI component for displaying project details
  return (
    <ProjectDetailsUI
      projectDetails={projectDetails}
      selectedStatus={selectedStatus}
      deletingProject={deletingProject}
      projectStatuses={projectStatuses}
      handleChangeStatus={handleChangeStatus}
      handleDeleteProject={handleDeleteProject}
      handleEditForm={handleEditForm}
    />
  );
};

export default ProjectDetails;
