"use client";
import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import ShowTasks from "./ShowTasks";

const Tasks = () => {
  return (
    <div className=" p-2">
      <h1 className=" text-xl font-semibold">Project Task</h1>

      <main className=" bg-white p-2 rounded-3xl border-2 mt-4">
        <header className=" flex justify-between items-center px-4">
          <Image src="/icons/todo.svg" alt="" width={20} height={20} />
          <Button className=" flex gap-2 bg-gray-100 text-black">
            <img src="/icons/plus.svg" alt="" /> Add Task
          </Button>
        </header>
        <ShowTasks />
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

export default Tasks;
