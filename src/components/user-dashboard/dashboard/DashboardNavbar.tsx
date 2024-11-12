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

const DashboardNavbar = () => {
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

  const companyInformation = companySettingsMenuItems.slice(0, 3).map((item) => (
    <>
      <h2 className=" text-md font-semibold sm:mt-3 mt-1">{item.title}</h2>
      {item.items.map((item) => (
        <Link
          key={item.text}
          href={`/dashboard/${item.link}`}
          className=" text-gray-500 text-md flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md sm:p-2 p-1 "
        >
          <item.icon />
          <h3> {item.text} </h3>
        </Link>
      ))}
    </>
  ));

  const projectList = (
    <>
      {isError && <p className=" text-sm text-red-600">Failed to get projects</p>}
      {onGoingProjects.map((project) => (
        <Link
          href={`/project-details/${project.project_id}`}
          key={project.project_id}
          className=" text-gray-500 text-md flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-2"
        >
          <Image
            width={20}
            height={20}
            className="w-[20px]"
            src={"/icons/camera.svg"}
            alt="camera-icon"
          />
          <p className=" ml-4 line-clamp-1"> {project.name} </p>
        </Link>
      ))}

      <span className=" text-gray-500 text-md flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-2">
        <Image width={20} height={20} className="w-[20px]" src={"/icons/back.svg"} alt="icon" />
        <p className=" ml-4"> Past Projects </p>
      </span>
    </>
  );

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
    <nav className=" bg-white p-2 flex justify-between fixed w-full mx-auto max-w-[2000] top-0 z-50 shadow-sm">
      <section className=" flex items-center gap-4 xl:gap-16 sm:ml-8">
        <Link href="/dashboard">
          <Image
            className=" w-[125px] sm:w-[150px]"
            src={"/logo.svg"}
            width={50}
            height={10}
            alt="storyvord-logo"
          />
        </Link>
        <div className="hidden lg:flex gap-4 border p-2 rounded-lg h-10">
          <Image
            className="w-[30px]"
            src={"/icons/search.svg"}
            width={50}
            height={10}
            alt="search"
          />
          <input
            className=" border-l-2 pl-4 focus:border-l-2 focus:outline-none"
            placeholder="Search or type"
          />
        </div>
      </section>
      <section className=" flex items-center gap-3 sm:gap-10">
        <DropdownMenu>
          <DropdownMenuTrigger className="sm:flex items-center gap-4 cursor-pointer hidden">
            <h1>Project Name</h1>
            <Image
              width={20}
              height={20}
              className="w-[12px]"
              src={"/icons/down-arrow.svg"}
              alt="notification"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>{projectList}</DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className=" sm:flex items-center gap-4 cursor-pointer hidden">
            <h1>Org</h1>
            <Image
              width={20}
              height={20}
              className="w-[12px]"
              src={"/icons/down-arrow.svg"}
              alt="notification"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-4">{companyInformation}</DropdownMenuContent>
        </DropdownMenu>

        <Link href="/dashboard/message">
          <Image
            width={20}
            height={20}
            className="w-[20px] sm:w-[24px] cursor-pointer"
            src={"/icons/message.svg"}
            alt="message"
          />
        </Link>
        <Image
          width={20}
          height={20}
          className="w-[20px] sm:w-[24px] cursor-pointer"
          src={"/icons/notification.svg"}
          alt="notification"
        />
        <div className=" hidden sm:flex">
          <DropdownMenu>
            <DropdownMenuTrigger className=" flex items-center gap-2 cursor-pointer">
              <Image width={40} height={40} src={"/profile.png"} alt="profile" />
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
          <Image width={30} height={30} src={"/profile.png"} alt="profile" />
          {toggleMenu ? (
            <Image
              width={15}
              height={15}
              className="w-[12px]"
              src={"/icons/up-arrow.svg"}
              alt="notification"
            />
          ) : (
            <Image
              width={15}
              height={15}
              className="w-[12px]"
              src={"/icons/down-arrow.svg"}
              alt="notification"
            />
          )}
        </button>
        {toggleMenu && (
          <div className=" absolute z-50 bg-white top-14 left-0 w-full min-h-[95vh] sm:hidden p-3 space-y-4 pt-8">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className=" p-2 bg-gray-100 border-none rounded-md">
                  Project
                </AccordionTrigger>
                <AccordionContent onClick={handleMenuItemClick} className=" px-4">
                  {projectList}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className=" p-2 bg-gray-100 rounded-md">
                  Org Name
                </AccordionTrigger>
                <AccordionContent onClick={handleMenuItemClick} className=" px-4">
                  {companyInformation}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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

export default DashboardNavbar;
