"use client";
import React, { useEffect, useState } from "react";
import Profile from "@/components/crew/profile/Profile";
import Endorsements from "@/components/crew/profile/Endorsements";
import Portfolio from "@/components/crew/profile/Portfolio";
import SocialLinks from "@/components/crew/profile/SocialLinks";
import Credit from "@/components/crew/profile/Credit";
import Education from "@/components/crew/profile/Education";
import {
  useDeleteCredit,
  useDeleteEducation,
  useDeleteEndorsement,
  useDeletePortfolio,
  useDeleteSocialLink,
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
  const { data: socialLinksData } = useGetSocialLink();
  const { data: endorsementData } = useGetEndorsement();
  const { data: creditsData } = useGetCredit();

  const { mutateAsync: deleteEducation, isPending: isLoadingDeleteEducation } =
    useDeleteEducation();
  const { mutateAsync: deleteEndorsement, isPending: isLoadingDeleteEndorsement } =
    useDeleteEndorsement();
  const { mutateAsync: deletePortfolio, isPending: isLoadingDeletePortfolio } =
    useDeletePortfolio();
  const { mutateAsync: deleteCredit, isPending: isLoadingDeleteCredit } = useDeleteCredit();
  const { mutateAsync: deleteSocialLink, isPending: isLoadingDeleteSocialLinks } =
    useDeleteSocialLink();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Prevent rendering during SSR
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Profile profile={profileData} />
      <Portfolio
        portfolioData={portfolioData}
        deletePortfolio={deletePortfolio}
        isLoadingDeletePortfolio={isLoadingDeletePortfolio}
      />
      <Education
        educationData={educationData}
        deleteEducation={deleteEducation}
        isLoadingDeleteEducation={isLoadingDeleteEducation}
      />
      <Endorsements
        endorsementData={endorsementData}
        deleteEndorsement={deleteEndorsement}
        isLoadingDeleteEndorsement={isLoadingDeleteEndorsement}
      />
      <Credit
        creditsData={creditsData}
        deleteCredit={deleteCredit}
        isLoadingDeleteCredit={isLoadingDeleteCredit}
      />
      <SocialLinks
        socialLinksData={socialLinksData}
        deleteSocialLink={deleteSocialLink}
        isLoadingDeleteSocialLinks={isLoadingDeleteSocialLinks}
      />
    </div>
  );
};

export default ProfilePage;
