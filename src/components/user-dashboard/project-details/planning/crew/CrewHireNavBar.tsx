import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CiLock } from "react-icons/ci";
import { Input } from "@/components/ui/input";

type Props = {
  setOpenDialog: (value: boolean) => void;
  openDialog: boolean;
  setOpenDialogExternalContact: (value: boolean) => void;
  openDialogExternalContact: boolean;
};

const CrewHireNavBar = ({
  setOpenDialog,
  openDialog,
  setOpenDialogExternalContact,
  openDialogExternalContact,
}: Props) => {
  return (
    <nav className="mx-auto flex gap-4 justify-end mr-8">
      <Popover>
        <PopoverTrigger>
          <Button className=" mr-4 font-semibold">Add Crew</Button>
        </PopoverTrigger>
        <PopoverContent>
          <h1
            className=" p-1 pl-2 hover:bg-gray-200 rounded cursor-pointer"
            onClick={() => setOpenDialog(!openDialog)}
          >
            Invite Crew
          </h1>
          <h1
            onClick={() => setOpenDialogExternalContact(!openDialogExternalContact)}
            className=" mt-2 p-1 pl-2 hover:bg-gray-200 rounded cursor-pointer"
          >
            Add external contact
          </h1>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger className=" flex gap-2 p-1 border-none rounded-lg px-2 item-center font-semibold bg-white border text-lg">
          <CiLock className=" w-6 h-6" />
          Access Rights
        </PopoverTrigger>
        <PopoverContent>
          <Input placeholder="enter email" />
        </PopoverContent>
      </Popover>
    </nav>
  );
};

export default CrewHireNavBar;
