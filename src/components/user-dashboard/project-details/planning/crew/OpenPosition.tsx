import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import OpenPositionDialog from "./OpenPositionDialog";

const OpenPosition = () => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div className=" w-full flex justify-center">
      <Button className=" mt-10" onClick={() => setOpenDialog(!openDialog)}>Add Open Position</Button>
      <OpenPositionDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
};

export default OpenPosition;
