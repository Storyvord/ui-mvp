"use client";
import ProjectCard from "@/components/crew/projects/ProjectCard";
import Tabs from "@/components/Tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  useAcceptInvitation,
  useGetInvitations,
  useRejectInvitation,
} from "@/lib/react-query/queriesAndMutations/crew/invitations";
import React, { useState } from "react";

const tabs = ["In Progress", "Invitations", "Rejected"];
export type Project = {
  id: number;
  project: string;
  project_name: string;
  referral_code: string;
  status: "pending" | "rejected" | "accepted";
  created_at: string;
  message: string;
};
const Projects = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { toast } = useToast();

  const { data: projects } = useGetInvitations();

  const {
    mutateAsync: acceptInvitation,
    isPending: isAcceptLoading,
    isError: isAcceptError,
  } = useAcceptInvitation();
  const {
    mutateAsync: rejectInvitation,
    isPending: isRejectLoading,
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
        {activeTab === tabs[0] && (
          <>
            {projects?.accepted.length === 0 && (
              <p className=" text-gray-600 font-semibold">No project found</p>
            )}
            {projects?.accepted.map((project: Project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </>
        )}
        {activeTab === tabs[1] && (
          <>
            {projects?.pending.length === 0 && (
              <p className=" text-gray-600 font-semibold">No project found</p>
            )}
            {projects?.pending.map((project: Project) => (
              <ProjectCard
                key={project.id}
                project={project}
                handleAccept={handleAccept}
                handleReject={handleReject}
                isAcceptLoading={isAcceptLoading}
                isRejectLoading={isRejectLoading}
              />
            ))}
          </>
        )}

        {activeTab === tabs[2] && (
          <>
            {projects?.rejected.length === 0 && (
              <p className=" text-gray-600 font-semibold">No project found</p>
            )}
            {projects?.rejected.map((project: Project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Projects;
