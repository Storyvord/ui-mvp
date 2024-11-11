"use client";
import Image from "next/image";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import CreateScripts from "@/components/user-dashboard/project-details/breakdown-more/script/CreateScripts";
import UploadScripts from "@/components/user-dashboard/project-details/breakdown-more/script/UploadScripts";

const Script = () => {
  const [createScriptDialog, setCreateScriptDialog] = useState(false);
  const [uploadScriptDialog, setUploadScriptDialog] = useState(false);
  return (
    <div className=" w-full p-4">
      <h2 className="hidden md:block text-xl font-semibold">Scripts</h2>
      <section className=" flex justify-center items-center mt-36 gap-6">
        <Button
          onClick={() => setCreateScriptDialog(true)}
          className=" flex gap-2 bg-green-500 hover:bg-green-700"
        >
          <Image src="/icons/plus-3.svg" alt="icon" width={13} height={13} />
          Create Script{" "}
        </Button>
        <Button
          onClick={() => setUploadScriptDialog(true)}
          className=" flex gap-2 bg-green-500 hover:bg-green-700"
        >
          <Image src="/icons/upload.svg" alt="icon" width={13} height={13} />
          Import Script
        </Button>
      </section>
      <CreateScripts openDialog={createScriptDialog} setOpenDialog={setCreateScriptDialog} />
      <UploadScripts openDialog={uploadScriptDialog} setOpenDialog={setUploadScriptDialog} />
    </div>
  );
};

export default Script;
