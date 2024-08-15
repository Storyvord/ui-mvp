"use client";
import React from "react";
import Profile from "../../../components/crew/profile/Profile";
import Endorsements from "../../../components/crew/profile/Endorsements";
import Portfolio from "../../../components/crew/profile/Portfolio";
import SocialLinks from "../../../components/crew/profile/SocialLinks";
import {
  useGetEducation,
  useGetEndorsement,
  useGetPortfolio,
  useGetProfile,
  useGetSocialLink,
} from "@/lib/react-query/queriesAndMutations/crew/profile";
import Education from "../../../components/crew/profile/Education";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const { data: profileData } = useGetProfile();
  JSON.stringify(localStorage.setItem("crew-profile-id", profileData?.id));
  const { data: portfolioData } = useGetPortfolio();
  const { data: educationData } = useGetEducation();
  const { data: socialLinks } = useGetSocialLink();
  const { data: endorsementData } = useGetEndorsement();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Profile profile={profileData} />
      <Endorsements endorsements={endorsementData} />
      <Portfolio portfolio={portfolioData} />
      <SocialLinks socialLinks={socialLinks} />
      <Education education={educationData} />
    </div>
  );
};

export default ProfilePage;
