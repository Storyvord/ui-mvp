"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import ProjectComponent from "./ProjectComponent";
import PortfolioForm from "../update-profile/PortfolioForm";
import FieldControl from "./FieldControl";

type PortfolioProps = {
  portfolioData: {
    image: string;
    title: string;
    description: string;
    link: string;
    id: number;
  }[];
  deletePortfolio: (id: number) => void;
  isLoadingDeletePortfolio: boolean;
};

const Portfolio = ({
  portfolioData,
  deletePortfolio,
  isLoadingDeletePortfolio,
}: PortfolioProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editableFieldId, setEditableFieldId] = useState<number>();

  return (
    <div className="bg-white p-6 shadow-md max-w-4xl mx-auto">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
        <span className="flex gap-3">
          <FaPlus
            onClick={() => {
              setOpenDialog(true);
              setEditableFieldId(undefined);
            }}
            className="w-6 h-6 cursor-pointer"
          />
        </span>
      </div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
        {portfolioData?.map((project, index) => (
          <div className="relative" key={index + project.title}>
            <FieldControl
              isLoading={isLoadingDeletePortfolio}
              deleteItem={deletePortfolio}
              setEditableFieldId={setEditableFieldId}
              setOpenDialog={setOpenDialog}
              id={project.id}
            />
            <ProjectComponent
              imageUrl={project?.image}
              projectTitle={project?.title}
              projectDescription={project?.description}
              projectLink={project?.link}
            />
          </div>
        ))}
      </div>
      <PortfolioForm
        fieldId={editableFieldId}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </div>
  );
};

export default Portfolio;
