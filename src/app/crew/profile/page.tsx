"use client";
import React, { useEffect, useState } from "react";
import Profile from "@/components/crew/profile/Profile";
import Endorsements from "@/components/crew/profile/Endorsements";
import Portfolio from "@/components/crew/profile/Portfolio";
import SocialLinks from "@/components/crew/profile/SocialLinks";
import Credit from "@/components/crew/profile/Credit";
import Education from "@/components/crew/profile/Education";
import {
  useGetCredit,
  useGetEducation,
  useGetEndorsement,
  useGetPortfolio,
  useGetProfile,
  useGetSocialLink,
} from "@/lib/react-query/queriesAndMutations/crew/profile";

const ProfilePage = () => {
  const { data: profileData } = useGetProfile();
  const { data: portfolioData } = useGetPortfolio();
  const { data: educationData } = useGetEducation();
  const { data: socialLinks } = useGetSocialLink();
  const { data: endorsementData } = useGetEndorsement();
  const { data: creditsData } = useGetCredit();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Prevent rendering during SSR
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {profileData && <Profile profile={profileData} />}
      {endorsementData && <Endorsements endorsements={endorsementData} />}
      {portfolioData && <Portfolio portfolio={portfolioData} />}
      {creditsData && <Credit credits={creditsData} />}
      {socialLinks && <SocialLinks socialLinks={socialLinks} />}
      {educationData && <Education education={educationData} />}
    </div>
  );
};

export default ProfilePage;
