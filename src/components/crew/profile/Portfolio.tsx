import React from "react";
import ProjectComponent from "./ProjectComponent";

type PortfolioProps = {
  portfolio: {
    image: string;
    title: string;
    description: string;
    link: string;
  }[];
};

const Portfolio = ({ portfolio }: PortfolioProps) => {
  return (
    <div className="bg-white p-6 shadow-md max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
        {portfolio?.map((project, index) => (
          <ProjectComponent
            key={index}
            imageUrl={project?.image}
            projectTitle={project?.title}
            projectDescription={project?.description}
            projectLink={project?.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
