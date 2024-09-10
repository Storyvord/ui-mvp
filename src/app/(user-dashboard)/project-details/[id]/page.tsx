"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useProjectControl } from "@/context/ProjectContext";
import {
  useDeleteProject,
  useEditProject,
  useGetProjectDetails,
} from "@/lib/react-query/queriesAndMutations/project";

import LoadingPage from "@/components/projectdetails/LoadingPage";
import ProjectDetailsUI from "@/components/projectdetails/ProjectDetailsUI";

const projectStatuses = [
  { value: "COMPLETED", label: "COMPLETED" },
  { value: "CANCELLED", label: "CANCELLED" },
  { value: "PAUSED", label: "PAUSED" },
  { value: "PRE_PRODUCTION", label: "PRE_PRODUCTION" },
  { value: "POST_PRODUCTION", label: "POST_PRODUCTION" },
  { value: "RELEASED", label: "RELEASED" },
];

const ProjectDetails: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<{ value: string; label: string } | null>(
    null
  );
  const { id: projectId } = useParams<{ id: string }>();
  const router = useRouter();
  const { setProject } = useProjectControl();

  const {
    data: projectDetails,
    isLoading: projectDetailsLoading,
    isError,
  } = useGetProjectDetails(projectId);
  const { mutateAsync: deleteProject, isLoading: deletingProject } = useDeleteProject();
  const { mutateAsync: editProject } = useEditProject(projectId);

  // set project in global state
  useEffect(() => {
    if (projectDetails) {
      setProject({ id: projectDetails?.project_id, name: projectDetails?.name });
    }
  }, [projectDetails, setProject]);

  const handleDeleteProject = async () => {
    await deleteProject({ project_id: projectId });
    router.push("/dashboard/home");
  };

  // This function handle the status select input field
  const handleChange = (selectedOption: any) => {
    setSelectedStatus(selectedOption);

    const transformProject = { ...projectDetails, status: selectedOption.value };
    editProject(transformProject);
  };

  if (projectDetailsLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <div className="w-full text-center text-red-700 ">Failed to fetch project details</div>;
  }

  return (
    <ProjectDetailsUI
      projectDetails={projectDetails}
      selectedStatus={selectedStatus}
      deletingProject={deletingProject}
      projectStatuses={projectStatuses}
      handleChange={handleChange}
      handleDeleteProject={handleDeleteProject}
    />
  );
};

export default ProjectDetails;
