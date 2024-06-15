"use client";

import React from "react";

interface CrewMember {
  name: string;
  yoe: number;
  minRatePerDay: number;
  maxRatePerDay: number;
  location: string;
  preferred_because: string;
}

interface CrewCardProps {
  role: string;
  crewMember: CrewMember;
}

const CrewCard: React.FC<CrewCardProps> = ({ role, crewMember }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
      <img
        className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover mb-4"
        src={`https://randomuser.me/api/portraits/lego/${Math.floor(
          Math.random() * 10
        )}.jpg`}
        alt="Card Image"
      />
      <div className="text-center">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          {role}
        </div>
        <h3 className="block mt-2 text-lg leading-tight font-medium text-black">
          {crewMember.name}
        </h3>
        <p className="mt-2 text-gray-500">
          Years of Experience: {crewMember.yoe}
        </p>
        <p className="mt-2 text-gray-500">
          Rate Per Day: ${crewMember.minRatePerDay} - $
          {crewMember.maxRatePerDay}
        </p>
        <p className="mt-2 text-gray-500">Location: {crewMember.location}</p>
      </div>
      <button className="mt-4 py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300">
        View Profile
      </button>
    </div>
  );
};

export default CrewCard;
