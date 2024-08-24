"use client";
import ProjectCard from "@/components/crew/projects/ProjectCard";
import Tabs from "@/components/Tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  useAcceptInvitation,
  useGetInvitations,
  useRejectInvitation,
} from "@/lib/react-query/queriesAndMutations/crew/invitations";
import React, { useEffect, useState } from "react";

const tabs = ["In Progress", "Completed", "Invitations", "Rejected"];
export type Project = {
  id: number;
  project: string;
  project_name: string;
  referral_code: string;
  status: "pending" | "rejected" | "accepted";
  created_at: string;
};
const Projects = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [invitedProjects, setInvitedProject] = useState([]);
  const [inProgressProjects, setInProgressProject] = useState([]);
  const [rejectedProjects, setRejectedProjects] = useState([]);
  const { toast } = useToast();

  const { data: projects } = useGetInvitations();

  useEffect(() => {
    const invitedProjects = projects?.filter((project: Project) => {
      return project.status === "pending";
    });
    setInvitedProject(invitedProjects);

    const inProgressProjects = projects?.filter((project: Project) => {
      return project.status === "accepted";
    });
    setInProgressProject(inProgressProjects);

    const rejectedProjects = projects?.filter((project: Project) => {
      return project.status === "rejected";
    });
    setRejectedProjects(rejectedProjects);
  }, [projects]);

  const {
    mutateAsync: acceptInvitation,
    isLoading: isAcceptLoading,
    isError: isAcceptError,
  } = useAcceptInvitation();
  const {
    mutateAsync: rejectInvitation,
    isLoading: isRejectLoading,
    isError: isRejectError,
  } = useRejectInvitation();
  const handleAccept = async (referral_code: string) => {
    const res = await acceptInvitation(referral_code);
    if (res) {
      toast({ title: "Invitation accepted" });
    } else {
      toast({ title: "Failed to send accept request", variant: "destructive" });
    }
  };

  const handleReject = async (referral_code: string) => {
    const res = await rejectInvitation(referral_code);
    if (res) {
      toast({ title: "Invitation rejected" });
    } else {
      toast({ title: "Failed to send reject request", variant: "destructive" });
    }
  };
  return (
    <div>
      <h1 className=" text-2xl font-semibold">Projects</h1>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      <div className="p-4 mt-4 text-center font-mono">
        {activeTab === tabs[0] &&
          inProgressProjects?.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        {activeTab === tabs[1] && "Completed"}
        {activeTab === tabs[2] &&
          invitedProjects?.map((project: Project) => (
            <ProjectCard
              key={project.id}
              project={project}
              handleAccept={handleAccept}
              handleReject={handleReject}
              isAcceptLoading={isAcceptLoading}
              isRejectLoading={isRejectLoading}
            />
          ))}

        {activeTab === tabs[3] &&
          rejectedProjects?.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
      </div>
    </div>
  );
};

export default Projects;
