"use client";
import { Button } from "@/components/ui/button";
import React, { FC, useState } from "react";
import Image from "next/image";
import callSheetImg from "@/assets/callsheets.png";
import CallSheetForm from "@/components/user-dashboard/project-details/planning/call-sheet/CallSheetForm";

const Page: FC = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  return (
    <div className="py-4 px-4">
      <div className="p-2 flex flex-col items-start">
        <div className="flex flex-col items-center w-full">
          <div className="text-slate-500 text-lg lg:text-xl text-center mb-1 py-2">
            Generate ready to go, pre-populated call sheets in minutes with breakdown, schedule, and
            department information attached.
          </div>

          <Button
            onClick={() => setOpenDialog(true)}
            className="rounded-md flex items-center space-x-2 mt-2"
            variant="outline"
          >
            Create Call Sheet
          </Button>
          <Image
            src={callSheetImg}
            alt="Call Sheet Example"
            layout="responsive"
            className="mt-5 w-5/6 max-w-[80%] h-auto mx-auto"
          />
        </div>
        <CallSheetForm openDialog={openDialog} setOpenDialog={setOpenDialog} />
      </div>
    </div>
  );
};

export default Page;
