"use client";
import Tabs from "@/components/Tabs";
import React, { useState } from "react";
import Educations from "./Educations";
import SocialLinks from "./SocialLinks";
import Endorsement from "./Endorsement";
import Credits from "./Credits";
import CreateProfile from "../create-profile/page";
import Portfolio from "../portfolio/page";

const tabs = ["Credits", "Education", "Endorsement", "Social Links", "Profile", "Portfolio"];
const UpdateProfile = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <div>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === tabs[0] && <Credits />}
      {activeTab === tabs[1] && <Educations />}
      {activeTab === tabs[2] && <Endorsement />}
      {activeTab === tabs[3] && <SocialLinks />}
      {activeTab === tabs[4] && <CreateProfile />}
      {activeTab === tabs[5] && <Portfolio />}
    </div>
  );
};

export default UpdateProfile;
