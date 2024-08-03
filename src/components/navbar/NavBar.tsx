"use client";
import React from "react";
import Paths from "./components/Paths";
import ProfileImage from "./components/ProfileImage";
import SideBarToggler from "./components/SideBarToggler";
import useNetworkStatus from "@/hooks/useNetworkStatus";

const NavBar = () => {
  const isOnline = useNetworkStatus();
  return (
    <nav className="block w-full max-w-full bg-transparent bg-white shadow-none transition-all p-2">
      <div className="flex flex-col-reverse justify-between gap-6 sm:flex-row sm:items-center">
        <div className="capitalize -mt-4 sm:mt-0 ">
          <Paths />
        </div>
        {!isOnline && <p className=" text-red-500 font-semibold border border-red-800 p-2 rounded-lg">You are offline</p>}
        <div className="flex items-center">
          <SideBarToggler />
          <ProfileImage />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
