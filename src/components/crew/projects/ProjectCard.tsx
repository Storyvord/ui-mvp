import React from "react";
import { Project } from "@/app/crew/projects/page";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  project: Project;
  handleAccept?: (referral_code: string) => void;
  isAcceptLoading?: boolean;
  handleReject?: (referral_code: string) => void;
  isRejectLoading?: boolean;
};

const ProjectCard = ({
  project,
  handleAccept,
  isAcceptLoading,
  handleReject,
  isRejectLoading,
}: Props) => {
  console.log(project);
  return (
    <div>
      <div
        key={project.id}
        className="p-4 mb-4 border rounded-lg shadow-md bg-white flex flex-col items-center gap-3 max-w-4xl mx-auto"
      >
        <h2 className="text-xl font-bold">{project.project_name}</h2>
        <p>
          <strong>Status:</strong> {project.status}
        </p>
        <p>
          <strong>Created At:</strong> {new Date(project.created_at).toLocaleString()}
        </p>
        <Accordion type="single" collapsible className=" sm:w-[50%]">
          <AccordionItem value="item-1">
            <AccordionTrigger>Note</AccordionTrigger>
            <AccordionContent>{project.message}</AccordionContent>
          </AccordionItem>
        </Accordion>
        {project.status === "pending" && (
          <div className="mt-4">
            {handleAccept && (
              <Button
                onClick={() => handleAccept(project.referral_code)}
                className="mr-2 bg-green-500 hover:bg-green-400 text-white rounded-lg"
                disabled={isAcceptLoading}
              >
                Accept
              </Button>
            )}
            {handleReject && (
              <Button
                onClick={() => handleReject(project.referral_code)}
                variant="destructive"
                disabled={isRejectLoading}
              >
                Reject
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
