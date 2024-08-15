"use client";
import Tabs from "@/components/Tabs";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const tabs = ["Submitted", "Hired"];
const Applications = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <div>
      <h1 className=" text-2xl font-semibold text-gray-800">Applications</h1>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} className=" mt-4" />
      {activeTab === tabs[0] && (
        <div className="flex flex-col items-center mt-8 bg-white rounded-md p-4 gap-2 font-mono">
          <h1 className=" text-lg">No submitted applications</h1>
          <h3 className=" text-md text-gray-700">
            Apply to postings and follow up on your applications here.
          </h3>
          <Button variant="outline" className=" rounded-lg">
            Find work
          </Button>
        </div>
      )}
      {activeTab === tabs[1] && (
        <div className="flex flex-col items-center mt-8 bg-white rounded-md p-4 gap-2 font-mono">
          <h1 className=" text-lg"> Not hired from an application yet</h1>
          <h3 className=" text-md text-gray-700">
            Keep track of all your accepted applications and view project details here.
          </h3>
        </div>
      )}
    </div>
  );
};

export default Applications;
