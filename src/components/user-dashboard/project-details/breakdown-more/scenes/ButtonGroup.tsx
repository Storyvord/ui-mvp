import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  setCreateScenesDialog: (value: boolean) => void;
  setUploadScenesDialog: (value: boolean) => void;
  className?: string;
};
const ButtonGroup = ({ setCreateScenesDialog, setUploadScenesDialog, className }: Props) => {
  return (
    <div className={cn(" flex justify-center items-center gap-6", className)}>
      <Button
        onClick={() => setCreateScenesDialog(true)}
        className=" flex gap-2 bg-green-500 hover:bg-green-700"
      >
        <Image src="/icons/plus-3.svg" alt="icon" width={13} height={13} />
        Create Scenes
      </Button>
      <Button
        onClick={() => setUploadScenesDialog(true)}
        className=" flex gap-2 bg-green-500 hover:bg-green-700"
      >
        <Image src="/icons/upload.svg" alt="icon" width={13} height={13} />
        Import Screenplay
      </Button>
    </div>
  );
};

export default ButtonGroup;
