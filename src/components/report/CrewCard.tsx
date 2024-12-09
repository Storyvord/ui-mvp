"use client";

import React, { useState, useEffect } from "react";

// Crew type definition
export type Crew = {
  id: string;
  name: string;
  job_title: string;
  bio: string;
  location: string;
  languages: string;
  contact_number: string;
  experience: string;
  skills: string;
  specializations: string;
  standardRate: string;
  technicalProficiencies: string;
};

type CrewRequirements = {
  message: string;
  data: {
    id: string;
    location: string;
    crew_suggestion: Crew[];
  }[];
};

// CrewCard Component
const CrewCard: React.FC<{ crew: Crew }> = ({ crew }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-md  border border-gray-200">
      <h3 className="text-xl font-poppins-bold text-gray-900">{crew.name}</h3>
      <p className="text-sm md:text-base font-poppins-semibold text-gray-700">{crew.job_title}</p>
      <p className="text-sm md:text-base font-poppins-regular text-gray-700 mt-2">{crew.bio}</p>
      <div className="mt-4 text-sm md:text:base text-gray-600">
        <p className=" text-base">
          <span className="font-poppins-semibold">Languages:</span> {crew.languages}
        </p>
        <p className=" text-base">
          <span className="font-poppins-semibold">Contact:</span> {crew.contact_number}
        </p>
        <p className=" text-base">
          <span className="font-poppins-semibold">Experience:</span> {crew.experience}
        </p>
        <p className=" text-base">
          <span className="font-poppins-semibold">Skills:</span> {crew.skills}
        </p>
        <p className=" text-base">
          <span className="font-poppins-semibold">Specializations:</span> {crew.specializations}
        </p>
        <p className=" text-base">
          <span className="font-semibold">Rate:</span> {crew.standardRate}
        </p>
        <p className=" text-base">
          <span className="font-semibold">Tools:</span> {crew.technicalProficiencies}
        </p>
      </div>
    </div>
  );
};

export default CrewCard;
