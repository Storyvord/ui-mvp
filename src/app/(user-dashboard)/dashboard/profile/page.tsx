"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { useGetClientProfile } from "@/lib/react-query/queriesAndMutations";

const Page: React.FC = () => {
  const { data: clientDetails } = useGetClientProfile();
  console.log(clientDetails);

  return (
    <div className="relative px-4 mt-4 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md mb-6 lg:mx-4 border border-blue-gray-100">
      <div className="p-4">
        <div className="px-4 pb-4">
          <div className="mb-4 flex justify-between items-center">
            <h1 className="font-semibold text-lg">Profile</h1>
            <Link href="/dashboard/update-profile">
              <button
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85]"
                type="button"
              >
                Update Profile
              </button>
            </Link>
          </div>

          {/* Profile Information Section */}
          <div className="mb-6">
            <h2 className="font-semibold text-blue-gray-900 text-lg mb-2">Profile Information</h2>
            <div className="flex flex-col lg:flex-row items-center bg-white shadow-sm rounded-lg">
              <div className="w-full lg:w-1/4 p-4 border-b lg:border-b-0 lg:border-r">
                <div className="flex justify-center">
                  {clientDetails?.image ? (
                    <Image
                      src={clientDetails.image}
                      alt="Profile"
                      className="rounded-full w-24 h-24 lg:w-36 lg:h-36 mx-auto"
                      width={144}
                      height={144}
                    />
                  ) : (
                    <CgProfile className="w-24 h-24 lg:w-36 lg:h-36 text-gray-500" />
                  )}
                </div>
                <h6 className="text-center mt-4 font-bold text-blue-gray-900">
                  {clientDetails?.formalName ||
                    `${clientDetails?.firstName} ${clientDetails?.lastName}`}
                </h6>
                <p className="text-center text-blue-gray-500 mt-2">{clientDetails?.role}</p>
              </div>
              <div className="w-full lg:w-3/4 p-4">
                <p className="text-blue-gray-500">
                  {clientDetails?.address}, {clientDetails?.locality}, {clientDetails?.countryName}
                </p>
                {clientDetails?.phone_number && (
                  <p className="text-blue-gray-500 mt-2">
                    <strong>Phone:</strong> {clientDetails.phone_number}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mb-6">
            <h2 className="font-semibold text-blue-gray-900 text-lg mb-2">Bio</h2>
            <p className="text-sm font-light leading-normal text-blue-gray-500">
              {clientDetails?.description || "No bio available."}
            </p>
          </div>

          {/* Contact Details Section */}
          <div className="mb-6">
            {clientDetails?.personalWebsite && (
              <div>
                <h6 className="font-semibold text-blue-gray-900">Website</h6>
                <a href={clientDetails.personalWebsite} className="text-blue-500 hover:underline">
                  {clientDetails.personalWebsite}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
