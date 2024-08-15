"use client";
import Tabs from "@/components/Tabs";
import React, { useState } from "react";
import Educations from "@/components/crew/update-profile/Educations";
import SocialLinks from "@/components/crew/update-profile/SocialLinks";
import Endorsement from "@/components/crew/update-profile/Endorsement";
import Credits from "@/components/crew/update-profile/Credits";
import Portfolio from "@/components/crew/update-profile/Portfolio";
import BasicDetails from "@/components/crew/update-profile/BasicDetails";

const tabs = ["Basic Details", "Credits", "Education", "Endorsement", "Social Links", "Portfolio"];
const UpdateProfile = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <div>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === tabs[0] && <BasicDetails />}
      {activeTab === tabs[1] && <Credits />}
      {activeTab === tabs[2] && <Educations />}
      {activeTab === tabs[3] && <Endorsement />}
      {activeTab === tabs[4] && <SocialLinks />}
      {activeTab === tabs[5] && <Portfolio />}
    </div>
  );
};

export default UpdateProfile;
