"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { useGetUserProfile } from "@/lib/react-query/queriesAndMutations/auth/auth";

const Page: React.FC = () => {
  const { data: userProfile } = useGetUserProfile();
  const clientDetails = userProfile?.data;

  const personalInfo = clientDetails?.personal_info;
  const clientProfile = clientDetails?.client_profile;

  return (
    <div className="container mx-auto p-3 md:p-6 font-poppins">
      {/* Profile Header */}
      <div className="p-6 bg-white flex items-center">
        <div className="flex-shrink-0">
          {personalInfo?.image ? (
            <Image
              src={personalInfo.image}
              alt="Profile"
              className="rounded-full w-24 h-24 border-4 border-white"
              width={96}
              height={96}
            />
          ) : (
            <CgProfile className="rounded-full w-24 h-24 border-4 border-white text-gray-300" />
          )}
        </div>
        <div className="ml-6">
          <h1 className="text-2xl font-bold">{personalInfo?.full_name || "No Name Provided"}</h1>
          <p className="text-sm">{personalInfo?.job_title || "No Job Title"}</p>
          <p className="text-sm">{clientProfile?.role || "No Role"}</p>
        </div>
        <div className="ml-auto">
          <Link href="/dashboard/update-profile">
            <button className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100">
              Update Profile
            </button>
          </Link>
        </div>
      </div>

      {/* Profile Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Bio */}
        <div className="bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Bio</h2>
          <p className="text-gray-600">{personalInfo?.bio || "No bio available."}</p>
        </div>

        {/* Personal Info */}
        <div className="bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h2>
          <p className="text-gray-600">
            <strong>Location:</strong> {personalInfo?.location || "No Location Provided"}
          </p>
          <p className="text-gray-600">
            <strong>Phone:</strong> {personalInfo?.contact_number || "No Contact Number"}
          </p>
          <p className="text-gray-600">
            <strong>Languages:</strong> {personalInfo?.languages || "No Languages Provided"}
          </p>
        </div>

        {/* Additional Details */}
        <div className="bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Additional Details</h2>
          <p className="text-gray-600">
            <strong>Drive Access:</strong> {clientProfile?.drive ? "Enabled" : "Disabled"}
          </p>
          <p className="text-gray-600">
            <strong>Status:</strong> {clientProfile?.active ? "Active" : "Inactive"}
          </p>
          {clientProfile?.personalWebsite && (
            <p className="text-gray-600">
              <strong>Website:</strong>{" "}
              <a
                href={clientProfile.personalWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {clientProfile.personalWebsite}
              </a>
            </p>
          )}
        </div>

        {/* Address */}
        <div className="bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Address</h2>
          <p className="text-gray-600">{clientProfile?.address || "No Address Provided"}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
