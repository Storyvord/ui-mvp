"use client";
import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
};

const CreateButton = ({ setOpenDialog, openDialog }: Props) => {
  return (
    <Button
      onClick={() => setOpenDialog(!openDialog)}
      className=" bg-green-500 text-white hover:bg-green-600 text-md mt-4"
    >
      + Create a new announcement
    </Button>
  );
};

export default CreateButton;
