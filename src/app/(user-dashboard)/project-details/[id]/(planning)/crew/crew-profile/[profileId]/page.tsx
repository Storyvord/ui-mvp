"use client";
import { useGetCrewFullProfile } from "@/lib/react-query/queriesAndMutations/crew";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Profile = {
  id?: number;
  image: string;
  name: string;
  phone: string;
  location: string;
  languages: string;
  job_title: string;
  bio: string;
  experience: string;
  skills: string;
  standardRate: string;
  technicalProficiencies: string;
  specializations: string;
  drive: boolean;
  active: boolean;
  user?: number;
};

const CrewProfile = () => {
  const { profileId, id: projectId }: { profileId: string; id: string } = useParams();
  const [profile, setProfile] = useState<Profile | undefined>();

  const { data } = useGetCrewFullProfile(profileId);

  useEffect(() => {
    setProfile(data?.at(0).crew_profile);
  }, [data]);
  console.log(data);
  console.log(profile);

  return (
    <>
      <Link
        href={`/project-details/${projectId}/crew`}
        className="text-xl font-semibold md:px-8 mt-3 flex gap-3 text-gray-700"
      >
        <Image src="/icons/left-arrow.svg" alt="language-icon" width={15} height={15} /> Crew
      </Link>
      <main className=" relative md:px-8 p-4 grid grid-cols-3 gap-4">
        <section className=" mt-4 col-span-2">
          <div className=" flex justify-between">
            <div className="flex flex-col items-center sm:flex-row sm:items-start">
              {profile?.image && (
                <Image
                  className="rounded-full object-fill"
                  src={profile?.image}
                  alt={profile?.name}
                  width={90}
                  height={90}
                />
              )}
              <div className="sm:ml-6 text-center sm:text-left mt-4 sm:mt-0">
                <h1 className="sm:text-2xl text-xl font-bold">{profile?.name}</h1>
                <h2 className="sm:text-xl text-md text-gray-600">{profile?.job_title}</h2>
                <p className="text-gray-500">{profile?.location}</p>
              </div>
            </div>
            <div className=" flex gap-2 items-center">
              <Image
                src="/icons/star.svg"
                width={17}
                height={17}
                alt="star-icon"
                className=" mb-[2px]"
              />
              5.0 (2)
            </div>
          </div>
          <div className=" flex justify-between mt-3 text-md">
            <span className=" flex gap-3 items-center">
              <Image src="/icons/language.svg" alt="language-icon" width={15} height={15} />{" "}
              {profile?.languages}
            </span>
            <span className=" flex gap-3 items-center">
              <Image src="/icons/location.svg" alt="language-icon" width={15} height={15} /> 1000
              Miles
            </span>
            <span className=" flex gap-3 items-center">
              Day Rate: <p className=" text-green-500 ">{profile?.standardRate}</p>
            </span>
          </div>
          <div className="mt-6 border-t pt-6">
            <h3 className="text-xl font-semibold">About</h3>
            <p className="mt-2 text-gray-700">{profile?.bio}</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-800">Experience</h4>
                <p className=" text-sm sm:text-md text-gray-700">{profile?.experience}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">Languages</h4>
                <p className=" text-sm sm:text-md text-gray-700">{profile?.languages}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">Skills</h4>
                <p className=" text-sm sm:text-md text-gray-700">{profile?.skills}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">Technical Proficiencies</h4>
                <p className=" text-sm sm:text-md text-gray-700">
                  {profile?.technicalProficiencies}
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">Specializations</h4>
                <p className=" text-sm sm:text-md text-gray-700">{profile?.specializations}</p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h3 className=" text-center text-lg font-semibold mt-16">Why AI Suggesting this crew.</h3>
          <p className=" p-4 border border-green-500 rounded-lg mt-4 bg-gradient-to-r from-green-500 to-gray-900 text-transparent bg-clip-text">
            Based on the details you&apos;ve provided for your project, our AI has analyzed key
            factors such as the project&apos;s genre, budget, shooting locations, and production
            scale to suggest the most suitable crew members. Each recommendation is tailored to meet
            your project&apos;s specific needs, ensuring you have professionals with the right
            expertise. For example, if your project involves complex action sequences, our AI may
            prioritize experienced stunt coordinators and cinematographers with a history in
            high-paced environments. Similarly, for dialogue-heavy scenes, it might suggest sound
            designers and editors skilled in balancing audio for clarity and emotion.
          </p>
        </section>
      </main>
    </>
  );
};

export default CrewProfile;
