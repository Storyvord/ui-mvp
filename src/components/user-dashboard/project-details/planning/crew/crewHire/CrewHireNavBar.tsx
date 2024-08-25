"use client";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CiLock } from "react-icons/ci";
import { Input } from "@/components/ui/input";

type Props = {
  setOpenDialog: (value: boolean) => void;
  openDialog: boolean;
  setOpenDialogExternalContact: (value: boolean) => void;
  openDialogExternalContact: boolean;
  searchValue: string;
  setSearchValue: (value: string) => void;
};

const CrewHireNavBar = ({
  setOpenDialog,
  openDialog,
  setOpenDialogExternalContact,
  openDialogExternalContact,
  searchValue,
  setSearchValue,
}: Props) => {
  return (
    <nav className="mx-auto flex gap-4 flex-col sm:flex-row justify-end">
      <div className=" flex gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="mr-4 font-semibold">Add Crew</Button>
          </PopoverTrigger>
          <PopoverContent>
            <h1
              className="p-1 pl-2 hover:bg-gray-200 rounded cursor-pointer"
              onClick={() => setOpenDialog(!openDialog)}
            >
              Invite Crew
            </h1>
            <h1
              onClick={() => setOpenDialogExternalContact(!openDialogExternalContact)}
              className="mt-2 p-1 pl-2 hover:bg-gray-200 rounded cursor-pointer"
            >
              Add external contact
            </h1>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CiLock className="w-6 h-6" />
              Access Rights
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Input placeholder="enter email" />
          </PopoverContent>
        </Popover>
      </div>
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="search crew"
      />
    </nav>
  );
};

export default CrewHireNavBar;
