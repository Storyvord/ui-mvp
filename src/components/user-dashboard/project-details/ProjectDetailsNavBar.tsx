"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { companySettingsMenuItems } from "@/constant/constant";
import { userLogout } from "@/lib/api/auth/auth";
import { Project as ProjectType } from "@/types/project";
import { useGetProjects } from "@/lib/react-query/queriesAndMutations/project";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProjectDetailsNavBar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { data: projects, isPending, isError } = useGetProjects();
  const [onGoingProjects, setOngoingProjects] = useState<ProjectType[]>([]);

  // Event handler to close the menu
  const handleMenuItemClick = () => {
    setToggleMenu(false);
  };

  useEffect(() => {
    if (projects) {
      // Filter ongoing projects based on their status
      const filteredOngoingProjects = projects.filter(
        (project: ProjectType) =>
          !["COMPLETED", "CANCELLED", "POST_PRODUCTION"].includes(project.status)
      );
      setOngoingProjects(filteredOngoingProjects);
    }
  }, [projects]);

  const profile = ["profile", "settings", "subscriptions"].map((item) => (
    <Link
      href={`/dashboard/${item}`}
      key={item}
      className=" text-gray-500 text-md flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-2"
    >
      {item.slice(0, 1).toUpperCase() + item.slice(1)}
    </Link>
  ));

  return (
    <nav className=" bg-white p-2 flex justify-between w-full">
      <Link href="/dashboard">
        <Image
          className="w-[170px] block md:hidden"
          src={"/logo.svg"}
          width={50}
          height={10}
          alt="storyvord-logo"
        />
      </Link>
      <section className=" flex items-center gap-3 sm:gap-10">
        <Link href="/dashboard/message">
          <img
            className="w-[20px] sm:w-[24px] cursor-pointer"
            src={"/icons/message.svg"}
            alt="message"
          />
        </Link>
        <img
          className="w-[20px] sm:w-[24px] cursor-pointer"
          src={"/icons/notification.svg"}
          alt="notification"
        />
        <div className=" hidden sm:flex">
          <DropdownMenu>
            <DropdownMenuTrigger className=" flex items-center gap-2 cursor-pointer">
              <img src={"/profile.png"} alt="profile" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {profile}
              <button
                onClick={() => userLogout()}
                className=" text-gray-500 text-md flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-2"
              >
                Logout
              </button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* mobile menu */}
        <button
          onClick={() => setToggleMenu(!toggleMenu)}
          className=" flex sm:hidden cursor-pointer gap-3 items-center"
        >
          <img src={"/profile.png"} className="w-[35]" alt="profile" />
          {toggleMenu ? (
            <img className="w-[12px]" src={"/icons/up-arrow.svg"} alt="notification" />
          ) : (
            <img className="w-[12px]" src={"/icons/down-arrow.svg"} alt="notification" />
          )}
        </button>
        {toggleMenu && (
          <div className=" absolute z-50 bg-white top-14 left-0 w-full min-h-[95vh] sm:hidden p-3 space-y-4 pt-8">
            <h3 className=" p-2 bg-gray-100 rounded-md">
              <Link onClick={handleMenuItemClick} href="/dashboard/profile">
                Profile
              </Link>
            </h3>
            <h3 className=" p-2 bg-gray-100 rounded-md">
              <Link onClick={handleMenuItemClick} href="/dashboard/settings">
                Settings
              </Link>
            </h3>
            <h3 className=" p-2 bg-gray-100 rounded-md">
              <Link onClick={handleMenuItemClick} href="/dashboard/subscriptions">
                Subscriptions
              </Link>
            </h3>
            <button
              onClick={() => userLogout()}
              className=" w-full border rounded-md mt-12 cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </section>
    </nav>
  );
};

export default ProjectDetailsNavBar;
