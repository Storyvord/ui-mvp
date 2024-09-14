"use client";
import { useParams } from "next/navigation";
import React from "react";

const Budget = () => {
  const { id: projectId } = useParams<{ id: string }>();

  return <div>Budget</div>;
};

export default Budget;
