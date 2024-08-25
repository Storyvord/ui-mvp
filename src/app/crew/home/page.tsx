"use client";

import Dashboard from "@/components/crew/Dashboard";
import { useGetProfile } from "@/lib/react-query/queriesAndMutations/crew/profile";
import React from "react";

const CrewSection = () => {
  const {data} = useGetProfile()

  return (
    <div className="">
      <Dashboard/>
    </div>
  );
};

export default CrewSection;
