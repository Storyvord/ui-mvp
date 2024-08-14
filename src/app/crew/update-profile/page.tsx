"use client";
import Tabs from "@/components/Tabs";
import React, { useState } from "react";
import Educations from "./Educations";
import SocialLinks from "./SocialLinks";
import Endorsement from "./Endorsement";
import Credits from "./Credits";

const tabs = ["Credits", "Education", "Endorsement", "Social Links"];
const UpdateProfile = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <div>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === tabs[0] && <Credits />}
      {activeTab === tabs[1] && <Educations />}
      {activeTab === tabs[3] && <SocialLinks />}
      {activeTab === tabs[2] && <Endorsement />}
    </div>
  );
};

export default UpdateProfile;
