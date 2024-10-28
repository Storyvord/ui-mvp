"use client";
import React, { useEffect, useRef } from "react";
import Posting from "@/components/user-dashboard/dashboard/posting/Posting";
import Project from "@/components/user-dashboard/dashboard/project/Project";
import Tasks from "@/components/user-dashboard/dashboard/tasks/Tasks";
import MyNetwork from "@/components/user-dashboard/dashboard/network/MyNetwork";
import CalendarSection from "@/components/user-dashboard/dashboard/calendar/CalendarSection";

const Dashboard = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <main className=" p-4 sm:py-6 sm:px-10" ref={componentRef}>
      <h1 className=" text-2xl font-semibold">Dashboard</h1>
      <div className=" grid grid-cols-1 md:grid-cols-4">
        <section className="md:col-span-3 h-full py-3 pr-2">
          <Project />
          <Posting />
          <CalendarSection />
        </section>
        <section className=" h-full pl-1 space-y-6">
          <Tasks />
          <MyNetwork />
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
