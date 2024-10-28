"use client";
import React from "react";
import Image from "next/image";
import ShowSchedule from "./ShowSchedule";

const ShootingSchedule = () => {
  return (
    <div className=" p-2">
      <h1 className=" text-xl font-semibold">Shooting Schedule</h1>

      <main className=" bg-white p-2 mt-4 rounded-3xl border-2">
        <header className=" flex justify-between items-center px-4">
          <Image src="/icons/todo.svg" alt="" width={20} height={20} />
        </header>
        <ShowSchedule />
      </main>
      {/* <CreateTask
        setFormOpen={setFormOpen}
        formOpen={formOpen}
        handleSubmission={createTask}
        crewList={employeeList}
      /> */}
    </div>
  );
};

export default ShootingSchedule;
