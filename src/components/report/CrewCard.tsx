"use client";

import Image from "next/image";
import React from "react";
import { CrewMember as CrewMemberInterface } from "@/types";

interface CrewCardProps {
  role: string;
  crewMember: CrewMemberInterface;
}

const CrewCard: React.FC<CrewCardProps> = ({ role, crewMember }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center transition-transform duration-300 hover:scale-105 max-w-sm w-full mx-auto">
      <div className="flex-shrink-0">
        <Image
          src={crewMember.profile_pic}
          width={96}
          height={96}
          className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover mb-4"
          alt="Crew Image"
        />
      </div>
      <div className="text-center">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-2">
          {role}
        </div>
        <h3 className="block text-xl leading-tight font-medium text-balance truncate max-w-full">
          {crewMember.name}
        </h3>
        <div className="mt-2 space-y-2">
          <p className="text-gray-500 text-base">
            Years of Experience: {crewMember.yoe}
          </p>
          <p className="text-gray-500 text-base">
            Rate Per Day: ${crewMember.minRatePerDay} - $
            {crewMember.maxRatePerDay}
          </p>
          <p className="text-gray-500 text-base">
            Location: {crewMember.location}
          </p>
        </div>
      </div>
      <div className="flex mt-4">
        <button className="py-2 px-4 bg-[#111827] text-white rounded-lg transition-colors duration-300 text-base w-full">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default CrewCard;
