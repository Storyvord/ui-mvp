import React from "react";

type Props = {
  name: string;
  status: string;
};
const ProjectCard = ({ name, status }: Props) => {
  return (
    <div className=" w-80 md:min-h-52 border rounded-2xl p-4 bg-white flex flex-col gap-4 cursor-pointer">
      <div className=" flex justify-between">
        <img src="/icons/project.svg" alt="" />
        <p className=" px-2 py-1 rounded-md bg-gray-200 text-green-500 text-sm ">{status}</p>
      </div>
      <span>
        <h2>{name}</h2>
        <h4>Storyvord</h4>
      </span>
      <img className=" mt-auto" width={45} src="/profile-2.png" alt="" />
    </div>
  );
};

export default ProjectCard;
