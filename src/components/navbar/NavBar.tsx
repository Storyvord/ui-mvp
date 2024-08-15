"use client";
import React from "react";
import Paths from "./components/Paths";
import ProfileImage from "./components/ProfileImage";
import SideBarToggler from "./components/SideBarToggler";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import { companySettingsMenuItems } from "@/constant/constant";
import Link from "next/link";

const NavBar = () => {
  const isOnline = useNetworkStatus();
  return (
    <nav className="block w-full max-w-full bg-transparent bg-white shadow-none transition-all p-2">
      <div className="flex justify-between gap-6  items-center">
        <div className="capitalize -mt-4 sm:mt-0 hidden sm:flex  ">
          <Paths />
        </div>
        {!isOnline && (
          <p className=" text-red-500 font-semibold border border-red-800 p-2 rounded-lg">
            You are offline
          </p>
        )}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 font-semibold">
              Storyvord <IoIosArrowDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" px-4">
              {companySettingsMenuItems.map((details, index) =>
                details.items.map((item) => (
                  <Link key={index} href={`/dashboard/${item.link}`}>
                    <DropdownMenuItem className="text-md my-2 flex gap-4 text-gray-800 cursor-pointer hover:bg-slate-300">
                      <item.icon className=" w-5 h-5" /> {item.text}
                    </DropdownMenuItem>
                  </Link>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <SideBarToggler />
          <ProfileImage />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
