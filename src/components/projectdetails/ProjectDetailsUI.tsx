"use client";
import React from "react";
import Select from "react-select";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { HiOutlinePencilSquare } from "react-icons/hi2";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Crew, Equipment, ProjectStatus } from "@/types/project";

interface ProjectDetailsUIProps {
  projectDetails: {
    name: string;
    status: ProjectStatus;
    content_type: string;
    budget_amount: string;
    location_details: { location: string }[];
    selected_crew: Crew[];
    equipment: Equipment[];
    brief: string;
  };
  selectedStatus: { value: string; label: string } | null;
  deletingProject: boolean;
  projectStatuses: { value: string; label: string }[];
  handleChangeStatus: (selectedOption: any) => void;
  handleDeleteProject: () => void;
  handleEditForm: () => void;
}

const ProjectDetailsUI: React.FC<ProjectDetailsUIProps> = ({
  projectDetails,
  selectedStatus,
  deletingProject,
  projectStatuses,
  handleChangeStatus,
  handleDeleteProject,
  handleEditForm,
}) => {
  return (
    <div className="flex w-full h-auto px-4">
      <Accordion type="single" collapsible defaultValue="project-details" className=" w-full">
        <AccordionItem value="project-details">
          <AccordionTrigger className=" font-semibold text-gray-700 flex md:gap-4 gap-0">
            <h1 className=" flex-grow text-start text-md md:text-xl ">{projectDetails?.name}</h1>
            <div className=" flex items-center gap-2 border-2 border-black p-2 rounded-md md:text-md text-sm">
              Project Details
              <Image
                src="/icons/project-eye.svg"
                alt="icon"
                width={25}
                height={25}
                className=" md:w-6 w-4 md:h-6 h-4"
              />
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card className="relative w-full h-full bg-white shadow-none rounded-md overflow-auto pt-2">
              <CardHeader className="sm:flex sm:flex-row-reverse sm:items-start sm:justify-between sm:space-y-0">
                <div className="flex gap-2 items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div>
                      {projectDetails?.status === "CANCELLED" && (
                        <p className="text-sm sm:text-base text-red-500 font-bold">CANCELLED</p>
                      )}
                      {projectDetails?.status === "COMPLETED" && (
                        <p className="text-sm sm:text-base text-green-500 font-bold">COMPLETED</p>
                      )}
                      {projectDetails?.status !== "COMPLETED" &&
                        projectDetails?.status !== "CANCELLED" && (
                          <p className="text-sm sm:text-base text-yellow-500 font-bold">
                            {projectDetails?.status}
                          </p>
                        )}
                    </div>
                  </div>

                  <Popover>
                    <PopoverTrigger>
                      <BsThreeDotsVertical className=" cursor-pointer w-4 h-4" />
                    </PopoverTrigger>
                    <PopoverContent className=" space-y-4 mr-6 w-fit">
                      <Button
                        onClick={handleEditForm}
                        variant="outline"
                        className=" w-full text-gray-600"
                      >
                        Edit &nbsp; <HiOutlinePencilSquare className="w-6 h-6" />
                      </Button>

                      <Select
                        options={projectStatuses}
                        placeholder="Change Status"
                        value={selectedStatus}
                        onChange={handleChangeStatus}
                      />
                      <Button
                        onClick={handleDeleteProject}
                        variant="outline"
                        className=" w-full text-gray-600"
                        disabled={deletingProject}
                      >
                        {deletingProject ? (
                          <Loader />
                        ) : (
                          <MdDelete className=" w-6 h-6 text-red-500" />
                        )}
                      </Button>
                    </PopoverContent>
                  </Popover>
                </div>
              </CardHeader>

              <CardContent className="font-sans p-0 flex flex-col gap-2 mt-4">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Content Type:
                  </h2>
                  <p className="text-base text-gray-600 dark:text-gray-200">
                    {projectDetails?.content_type}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Budget:
                  </h2>
                  <p className="text-base text-gray-600 dark:text-gray-200">
                    {projectDetails?.budget_amount}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Location:
                  </h2>
                  {projectDetails?.location_details?.length > 0 && (
                    <div className="text-base text-gray-600 dark:text-gray-200 flex">
                      {projectDetails?.location_details.map((item) => (
                        <p key={item.location}>{item.location}, &nbsp;</p>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Crew List:
                  </h2>
                  <CardDescription className="text-base flex flex-wrap text-gray-600 dark:text-gray-200">
                    {projectDetails?.selected_crew?.map((crew: Crew) => (
                      <p key={crew.id} className="min-w-fit">
                        {crew.title}, &nbsp;
                      </p>
                    ))}
                  </CardDescription>
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Equipment List:
                  </h2>
                  <CardDescription className="text-base flex flex-wrap text-gray-600 dark:text-gray-200">
                    {projectDetails?.equipment?.map((equipment: Equipment) => (
                      <p key={equipment.id} className="min-w-fit">
                        {equipment.title}, &nbsp;
                      </p>
                    ))}
                  </CardDescription>
                </div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className=" text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
                      Description
                    </AccordionTrigger>
                    <AccordionContent className=" px-4">
                      <CardDescription className="text-base text-gray-600 dark:text-gray-200">
                        {projectDetails?.brief}
                      </CardDescription>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProjectDetailsUI;
