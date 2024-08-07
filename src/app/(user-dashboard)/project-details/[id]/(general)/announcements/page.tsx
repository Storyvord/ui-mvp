"use client";
import React, { useState } from "react";
import { useGetAllAnnouncements } from "@/lib/react-query/queriesAndMutations/announcements";
import { ReturnAnnouncements } from "@/types";
import Announcement from "@/components/user-dashboard/project-details/general/announcements/Announcement";
import CreateAnnouncementDialog from "@/components/user-dashboard/project-details/general/announcements/CreateAnnouncementDialog";
import CreateButton from "@/components/user-dashboard/project-details/general/announcements/CreateButton";
import AnnouncementSkeleton from "@/components/user-dashboard/project-details/general/announcements/AnnouncementSkeleton";

const Announcements = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { data, isLoading } = useGetAllAnnouncements();

  return (
    <div className=" w-full px-4">
      <h1 className=" text-3xl my-4 underline">Announcements</h1>

      {isLoading && <AnnouncementSkeleton />}

      {data?.length === 0 ? (
        <div className="space-y-2 mt-8 text-center px-4">
          <h1 className=" text-2xl text-gray-400 w-[80%] mx-auto">
            Communicate important information to departments or the entire crew in one go and avoid
            time-draining email follow-ups.
          </h1>
          <CreateButton openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </div>
      ) : (
        <>
          <CreateButton openDialog={openDialog} setOpenDialog={setOpenDialog} />
          <section
            className="my-4 grid gap-4"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
          >
            {data?.map((item: ReturnAnnouncements) => (
              <Announcement key={item.id} title={item.title} message={item.message} id={item.id} />
            ))}
          </section>
        </>
      )}

      <CreateAnnouncementDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
};

export default Announcements;
