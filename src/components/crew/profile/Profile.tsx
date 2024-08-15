import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProfileProps {
  profile: {
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
  };
}

const Profile = ({ profile }: ProfileProps) => {
  return (
    <div className="bg-white p-6 shadow-md max-w-4xl mx-auto relative">
      {!profile?.image && <h2>Add your profile details, by clicking edit button</h2>}
      <Link href="/crew/update-profile" className=" cursor-pointer my-0 absolute top-2 right-2 ">
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </Link>
      {profile?.image && (
        <>
          <div className="flex flex-col items-center sm:flex-row sm:items-start">
            <Image
              className="rounded-full sm:w-40 sm:h-40 object-fill"
              src={profile?.image}
              alt={profile?.name}
              width={120}
              height={120}
            />
            <div className="sm:ml-6 text-center sm:text-left mt-4 sm:mt-0">
              <h1 className="sm:text-3xl text-xl font-bold">{profile?.name}</h1>
              <h2 className="sm:text-xl text-md text-gray-600">{profile?.job_title}</h2>
              <p className="text-gray-500">{profile?.location}</p>
              <p className="text-gray-500">{profile?.phone}</p>
            </div>
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
        </>
      )}
    </div>
  );
};

export default Profile;
