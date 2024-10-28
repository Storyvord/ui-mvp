"use client";
import Image from "next/image";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import CreateShots from "./_components/CreateShots";

const page = () => {
  const [createScriptDialog, setCreateScriptDialog] = useState(false);
  const [uploadScriptDialog, setUploadScriptDialog] = useState(false);
  return (
    <div className=" w-full p-4">
      <h2 className="hidden md:block text-xl font-semibold">Shots</h2>
      <p className=" text-center md:mt-8">
        Design shots to map out your project's visual flow. Include key details like composition,
        movement, and framing to bring your creative vision to life.
      </p>
      <section className=" flex justify-center items-center mt-36 gap-6">
        <Button
          onClick={() => setCreateScriptDialog(true)}
          className=" flex gap-2 bg-green-500 hover:bg-green-700"
        >
          <Image src="/icons/plus-3.svg" alt="icon" width={13} height={13} />
          Create Shots
        </Button>
      </section>
      <CreateShots openDialog={createScriptDialog} setOpenDialog={setCreateScriptDialog} />
    </div>
  );
};

export default page;
