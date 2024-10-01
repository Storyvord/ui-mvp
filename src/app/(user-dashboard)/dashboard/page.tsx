import React from "react";
import Posting from "@/components/user-dashboard/dashboard/posting/Posting";
import Project from "@/components/user-dashboard/dashboard/project/Project";
import Tasks from "@/components/user-dashboard/dashboard/tasks/Tasks";
import MyNetwork from "@/components/user-dashboard/dashboard/network/MyNetwork";
import CalendarSection from "@/components/user-dashboard/dashboard/calendar/CalendarSection";

const page = () => {
  return (
    <main className=" p-4 sm:py-6 sm:px-10">
      <h1 className=" text-2xl font-semibold">Dashboard</h1>
      <div className=" grid grid-cols-1 md:grid-cols-4 gap-3">
        <section className="md:col-span-3 h-full py-3">
          <Project />
          <Posting />
          <CalendarSection />
        </section>
        <section className=" h-full">
          <Tasks />
          <MyNetwork />
        </section>
      </div>
    </main>
  );
};

export default page;
