import Project from "@/components/user-dashboard/dashboard/project/Project";
import React from "react";

const page = () => {
  return (
    <main className=" py-6 px-10">
      <h1 className=" text-2xl font-semibold">Dashboard</h1>
      <div className=" grid grid-cols-4 gap-3">
        <section className="col-span-3 h-full py-3">
          <Project />
        </section>
        <section className=" border h-full"></section>
      </div>
    </main>
  );
};

export default page;
