import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import OpenPositionDialog from "./OpenPositionDialog";
import OpenPositionsSection from "./open-position/OpenPositionsSection";
import Filter from "./open-position/Filter";

type Job = {
  title: string;
  location: string;
  type: string;
  description: string;
};

const jobData = [
  {
    title: "Production Coordinator",
    location: "On-Site (Los Angeles)",
    type: "Full-time",
    description:
      "Seeking a highly organized Production Coordinator to manage scheduling, logistics, and communication across departments. Experience in feature film production preferred.",
  },
  {
    title: "Camera Operator",
    location: "Remote",
    type: "Freelance",
    description:
      "Experienced Camera Operator needed for an international documentary series. Must have experience with DSLR and cinema cameras. Remote applicants welcome with travel required.",
  },
  {
    title: "Sound Engineer",
    location: "On-Site (New York)",
    type: "Part-time",
    description:
      "Part-time Sound Engineer to manage sound capture on set for an independent film. Prior work with boom mics and multi-track recorders is essential.",
  },
  {
    title: "Gaffer",
    location: "On-Site (Atlanta)",
    type: "Contract",
    description:
      "Gaffer needed to handle lighting for a short film production. Must have knowledge of lighting setups and safety procedures.",
  },
  {
    title: "Production Assistant",
    location: "On-Site (Vancouver)",
    type: "Internship",
    description:
      "Entry-level Production Assistant to support various departments. Great opportunity to gain hands-on experience on a professional film set.",
  },
  {
    title: "Editor",
    location: "Remote",
    type: "Full-time",
    description:
      "Remote Editor needed to work on post-production for a web series. Proficiency in Adobe Premiere Pro or DaVinci Resolve required.",
  },
];

const OpenPosition = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobData);

  const handleFilterChange = (key: string, value: string) => {
    const filtered = jobData.filter((job) => {
      if (key === "search") return job.title.toLowerCase().includes(value.toLowerCase());
      return job[key as keyof Job] === value;
    });
    setFilteredJobs(filtered);
  };
  return (
    <div className=" w-full">
      <div className=" flex flex-col lg:flex-row justify-between items-center">
        <Button
          className="bg-green-500 hover:bg-green-600"
          onClick={() => setOpenDialog(!openDialog)}
        >
          Add Open Position
        </Button>
        <Filter onFilterChange={handleFilterChange} />
      </div>
      <OpenPositionDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
      <OpenPositionsSection jobData={filteredJobs} />
    </div>
  );
};

export default OpenPosition;
