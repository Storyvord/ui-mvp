"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import CreateAnnouncementDialog from "./CreateAnnouncementDialog";
import Announcement from "./Announcement";

const Announcements = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const CreateButton = (
    <Button onClick={() => setOpenDialog(!openDialog)} className=" text-md mt-4">
      + Create a new announcement
    </Button>
  );
  return (
    <div className=" w-full px-4">
      <h1 className=" text-3xl mt-4">Announcements</h1>
      {CreateButton}
      {/* <div className="space-y-2 mt-8 text-center px-4">
        <h1 className=" text-2xl text-gray-400 w-[80%] mx-auto">
          Communicate important information to departments or the entire crew in
          one go and avoid time-draining email follow-ups.
        </h1>
        {CreateButton}
      </div> */}
      <section className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Announcement title="" message="" />
        <Announcement title="" message="" />
        <Announcement title="" message="" />
        <Announcement title="" message="" />
      </section>

      <CreateAnnouncementDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </div>
  );
};

export default Announcements;
