"use client";
import React, { useState } from "react";
import Image from "next/image";

import { companySettingsMenuItems } from "@/constant/constant";
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
import Link from "next/link";
import { userLogout } from "@/lib/api/auth/auth";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const companyInformation = companySettingsMenuItems.slice(0, 3).map((item) => (
    <>
      <h2 className=" text-md font-semibold sm:mt-3 mt-1">{item.title}</h2>
      {item.items.map((item) => (
        <Link
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
      <span className=" text-gray-500 text-md flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-2">
        <img className="w-[20px]" src={"/icons/camera.svg"} alt="notification" />
        <p className=" ml-4"> Project 1 </p>
      </span>
      <span className=" text-gray-500 text-md flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-2">
        <img className="w-[20px]" src={"/icons/back.svg"} alt="notification" />
        <p className=" ml-4"> Past Projects </p>
      </span>
    </>
  );

  const profile = ["Profile", "Settings", "Subscription"].map((item) => (
    <p
      key={item}
      className=" text-gray-500 text-md flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-2"
    >
      {item}
    </p>
  ));

  return (
    <nav className=" bg-white p-2 flex justify-between relative">
      <section className=" flex items-center gap-4 xl:gap-16 sm:ml-8">
        <Image
          className=" w-[125px] sm:w-[170px]"
          src={"/logo.svg"}
          width={50}
          height={10}
          alt="storyvord-logo"
        />
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
            <img className="w-[12px]" src={"/icons/down-arrow.svg"} alt="notification" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>{projectList}</DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className=" sm:flex items-center gap-4 cursor-pointer hidden">
            <h1>Org Name</h1>
            <img className="w-[12px]" src={"/icons/down-arrow.svg"} alt="notification" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-4">{companyInformation}</DropdownMenuContent>
        </DropdownMenu>

        <img
          className="w-[20px] sm:w-[24px] cursor-pointer"
          src={"/icons/message.svg"}
          alt="message"
        />
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

        {/* mobile responsive */}
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
          <div className=" absolute z-50 bg-white top-14 left-0 w-full min-h-[90vh] sm:hidden p-3 space-y-4 pt-8">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className=" p-2 bg-gray-100 border-none rounded-md">
                  Project
                </AccordionTrigger>
                <AccordionContent className=" px-4">{projectList}</AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className=" p-2 bg-gray-100 rounded-md">
                  Org Name
                </AccordionTrigger>
                <AccordionContent className=" px-4">{companyInformation}</AccordionContent>
              </AccordionItem>
            </Accordion>
            <h3 className=" p-2 bg-gray-100 rounded-md">Profile</h3>
            <h3 className=" p-2 bg-gray-100 rounded-md">Settings</h3>
            <h3 className=" p-2 bg-gray-100 rounded-md">Subscriptions</h3>
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

export default Navbar;
