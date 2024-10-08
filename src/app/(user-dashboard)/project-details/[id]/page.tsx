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
import Image from "next/image";
import CalendarSection from "@/components/user-dashboard/dashboard/calendar/CalendarSection";
import Tasks from "@/components/user-dashboard/project-details/tasks/Tasks";
import ShootingSchedule from "@/components/user-dashboard/project-details/shootingSchedule/ShootingSchedule";
import WhatsGoingOn from "@/components/user-dashboard/project-details/whatsGoingOn/WhatsGoingOn";

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
    isPending: projectDetailsLoading,
    isError,
  } = useGetProjectDetails(projectId);

  // Mutation hook for deleting a project
  const { mutateAsync: deleteProject, isPending: deletingProject } = useDeleteProject();

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
    <>
      <ProjectDetailsUI
        projectDetails={projectDetails}
        selectedStatus={selectedStatus}
        deletingProject={deletingProject}
        projectStatuses={projectStatuses}
        handleChangeStatus={handleChangeStatus}
        handleDeleteProject={handleDeleteProject}
        handleEditForm={handleEditForm}
      />
      <main className=" sm:p-4">
        <h1 className=" text-xl md:text-2xl font-semibold text-gray-700">
          {" "}
          {projectDetails?.name}
        </h1>
        <div className=" relative mt-12 p-2 rounded-lg">
          <button className=" flex gap-3 bg-green-500 bg-opacity-10 px-4 py-3 border-2 border-green-500 rounded-md">
            <Image src="/icons/ai.svg" alt="icons" width={20} height={20} />
            Get AI Suggestions
          </button>
          <button className="rounded-t-lg rounded-br-lg absolute -top-8 left-40 shadow-lg shadow-gray-400 bg-gradient-to-r from-[#22CB67] to-[#092579] text-white font-semibold p-2 text-lg">
            It's Free
          </button>
        </div>
        <section className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <Tasks />
          <ShootingSchedule />
          <WhatsGoingOn />
        </section>
        <CalendarSection />
      </main>
    </>
  );
};

export default ProjectDetails;
