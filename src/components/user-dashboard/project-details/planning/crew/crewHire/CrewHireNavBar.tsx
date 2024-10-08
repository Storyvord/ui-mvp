"use client";
import React from "react";
import { CiLock } from "react-icons/ci";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  setOpenDialog: (value: boolean) => void;
  openDialog: boolean;
  searchValue: string;
  setSearchValue: (value: string) => void;
};

const CrewHireNavBar = ({ setOpenDialog, openDialog, searchValue, setSearchValue }: Props) => {
  return (
    <nav className="mx-auto flex gap-4 flex-col sm:flex-row justify-start">
      <div className=" flex gap-4">
        <Button onClick={() => setOpenDialog(!openDialog)} className="mr-4 font-semibold">
          Invite Crew
        </Button>
      </div>
      {/* <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="search crew"
      /> */}
    </nav>
  );
};

export default CrewHireNavBar;
