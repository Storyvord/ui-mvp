import React from "react";
import Posting from "@/components/user-dashboard/dashboard/posting/Posting";
import Project from "@/components/user-dashboard/dashboard/project/Project";

const page = () => {
  return (
    <main className=" py-6 px-10">
      <h1 className=" text-2xl font-semibold">Dashboard</h1>
      <div className=" grid grid-cols-4 gap-3">
        <section className="col-span-3 h-full py-3">
          <Project />
          <Posting/>
        </section>
        <section className=" border h-full"></section>
      </div>
    </main>
  );
};

export default page;
