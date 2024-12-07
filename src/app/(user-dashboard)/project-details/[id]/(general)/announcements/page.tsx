"use client";
import React, { useState } from "react";

import { useGetAllAnnouncements } from "@/lib/react-query/queriesAndMutations/announcements";
import Announcement from "@/components/user-dashboard/project-details/general/announcements/Announcement";
import CreateAnnouncementDialog from "@/components/user-dashboard/project-details/general/announcements/CreateAnnouncementDialog";
import CreateButton from "@/components/user-dashboard/project-details/general/announcements/CreateButton";
import AnnouncementSkeleton from "@/components/user-dashboard/project-details/general/announcements/AnnouncementSkeleton";
import Navbar from "@/components/user-dashboard/project-details/general/announcements/Navbar";
import { ReturnAnnouncements } from "@/types";

const Announcements = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { data, isPending } = useGetAllAnnouncements();
  console.log(data);
  return (
    <div className=" w-full px-4">
      <h1 className=" text-3xl my-4 underline">Announcements</h1>

      {isPending && <AnnouncementSkeleton />}

      <Navbar openDialog={openDialog} setOpenDialog={setOpenDialog} />
      {data?.results.length === 0 && <p className=" text-center pt-6 lg:pt-24">No Announcement</p>}

      <section
        className="my-4 grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
      >
        {data?.results.map((item: ReturnAnnouncements) => (
          <Announcement key={item.id} title={item.title} message={item.message} id={item.id} />
        ))}
      </section>

      <CreateAnnouncementDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
};

export default Announcements;
