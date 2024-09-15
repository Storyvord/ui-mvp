"use client";
import React, { Suspense, useEffect, useState } from "react";
import Profile from "@/components/crew/profile/Profile";
import Endorsements from "@/components/crew/profile/Endorsements";
import Portfolio from "@/components/crew/profile/Portfolio";
import SocialLinks from "@/components/crew/profile/SocialLinks";
import Credit from "@/components/crew/profile/Credit";
import Education from "@/components/crew/profile/Education";
import { useGetCrewFullProfile } from "@/lib/react-query/queriesAndMutations/crew";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";

const ProfilePageContent = () => {
  const searchParams = useSearchParams();
  const crewId = Number(searchParams.get("crewId"));
  const [profileData, setProfileData] = useState();
  const [portfolioData, setPortfolioData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [socialLinksData, setSocialLinksData] = useState([]);
  const [endorsementData, setEndorsementData] = useState([]);
  const [creditsData, setCreditsData] = useState([]);

  const { data: crewProfile } = useGetCrewFullProfile(crewId);

  useEffect(() => {
    setProfileData(crewProfile?.at(0)?.crew_profile);
  }, [crewProfile]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Prevent rendering during SSR
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Profile profile={profileData} isClient={true} />
      {/* <Education
        educationData={educationData}
        deleteEducation={deleteEducation}
        isLoadingDeleteEducation={isLoadingDeleteEducation}
      /> */}
      {/* <Portfolio
        portfolioData={portfolioData}
        deletePortfolio={deletePortfolio}
        isLoadingDeletePortfolio={isLoadingDeletePortfolio}
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
      /> */}
    </div>
  );
};

const ProfilePage = () => (
  <Suspense
    fallback={
      <div className=" w-full p-4 mt-8 flex justify-center">
        <Loader />
      </div>
    }
  >
    <ProfilePageContent />
  </Suspense>
);

export default ProfilePage;
