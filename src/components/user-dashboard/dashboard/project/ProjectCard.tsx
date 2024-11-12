import Image from "next/image";
import React from "react";

type Props = {
  name: string;
  status: string;
  location: string;
};
const ProjectCard = ({ name, status, location }: Props) => {
  return (
    <div className=" w-80 md:min-h-52 border rounded-2xl p-4 bg-white flex flex-col gap-4 cursor-pointer">
      <div className=" flex justify-between">
        <Image height={25} width={25} src="/icons/project.svg" alt="icon" />
        <p className=" px-2 py-1 rounded-md bg-gray-200 text-green-500 text-sm ">{status}</p>
      </div>
      <span>
        <h2>{name}</h2>
        <h4>Storyvord</h4>
      </span>
      {/* <Image height={40} width={40} className=" mt-auto" src="/profile-2.png" alt="icon" /> */}
      <p className=" mt-auto text-sm text-gray-600">{location}</p>
    </div>
  );
};

export default ProjectCard;
