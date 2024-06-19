"use client";

import Image from "next/image";
import React from "react";

interface CrewMember {
  name: string;
  yoe: number;
  minRatePerDay: number;
  maxRatePerDay: number;
  location: string;
  profile_pic: string;
  preferred_because: string;
}

interface CrewCardProps {
  role: string;
  crewMember: CrewMember;
}

const CrewCard: React.FC<CrewCardProps> = ({ role, crewMember }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
      <Image
        src={crewMember.profile_pic}
        width={96}
        height={96}
        className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover mb-4"
        alt="Crew Image"
      />
      {/* <img
        className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover mb-4"
        src={crewMember.profile_pic}
        alt="Card Image"
      /> */}
      <div className="text-center">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          {role}
        </div>
        <h3 className="block mt-2 text-xl leading-tight font-medium text-balance ...">
          {crewMember.name}
        </h3>
        <p className="mt-2 text-gray-500 text-base">
          Years of Experience: {crewMember.yoe}
        </p>
        <p className="mt-2 text-gray-500 text-base">
          Rate Per Day: ${crewMember.minRatePerDay} - $
          {crewMember.maxRatePerDay}
        </p>
        <p className="mt-2 text-gray-500 text-base">
          Location: {crewMember.location}
        </p>
      </div>
      <button className="mt-4 py-2 px-4 bg-[#111827] text-white rounded-lg transition-colors duration-300 text-base">
        View Profile
      </button>
    </div>
  );
};

export default CrewCard;
