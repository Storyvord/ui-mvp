import { useState } from "react";
import JobPositionCard from "./JobPositionCard";
import Filter from "./Filter";

type Job = {
  title: string;
  location: string;
  type: string;
  description: string;
};
type Props = {
  jobData: Job[];
};

const OpenPositionsSection = ({ jobData }: Props) => {
  return (
    <section className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {jobData.map((job, index) => (
          <JobPositionCard key={index} job={job} />
        ))}
      </div>
    </section>
  );
};

export default OpenPositionsSection;
