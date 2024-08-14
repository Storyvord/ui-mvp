"use client";
import Tabs from "@/components/Tabs";
import React, { useState } from "react";
import Educations from "./Educations";

const tabs = ["Credits", "Education", "Endorsement", "Social Links"];
const UpdateProfile = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <div>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === tabs[1] && <Educations />}
    </div>
  );
};

export default UpdateProfile;
