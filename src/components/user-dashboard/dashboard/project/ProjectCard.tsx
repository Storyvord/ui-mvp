import React from "react";

const ProjectCard = () => {
  return (
    <div className=" w-80 border rounded-2xl p-4 bg-white flex flex-col gap-4 cursor-pointer">
      <div className=" flex justify-between">
        <img src="/icons/project.svg" alt="" />
        <p className=" p-2 rounded-md bg-gray-200 text-green-500 font-semibold">Status</p>
      </div>
      <span>
        <h2>Project Name</h2>
        <h4>Org Name</h4>
      </span>
      <img width={45} src="/profile-2.png" alt="" />
    </div>
  );
};

export default ProjectCard;
