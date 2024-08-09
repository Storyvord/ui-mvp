"use client";

import { Button } from "@/components/ui/button";
import { userLogout } from "@/lib/api/api";
import React from "react";

const CrewSection = () => {

  return (
    <div className=" text-center">
      CrewSection
      <Button onClick={() => userLogout()}>Logo Out</Button>
    </div>
  );
};

export default CrewSection;
