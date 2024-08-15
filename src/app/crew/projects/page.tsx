"use client";
import Tabs from "@/components/Tabs";
import React, { useState } from "react";
const tabs = ["In Progress", "Completed", "Archived"];
const Projects = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <div>
      <h1 className=" text-2xl font-semibold">Projects</h1>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      <div className=" bg-white rounded-lg p-4 mt-4 text-center font-mono">
        You don&apos;t have any projects in &nbsp;
        {activeTab === tabs[0] && "progress"}
        {activeTab === tabs[1] && "completed"}
        {activeTab === tabs[2] && "archived"}
      </div>
    </div>
  );
};

export default Projects;
