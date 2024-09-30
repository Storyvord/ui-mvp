import { Button } from "@/components/ui/button";
import React from "react";

const Tasks = () => {
  return (
    <div className=" p-2">
      <header className=" flex justify-between items-center">
        <span className=" flex gap-2 items-center">
          <img src="/icons/task.svg" alt="" />
          <h1 className=" text-lg">My Task</h1>
        </span>
        <Button className=" flex gap-2">
          <img src="/icons/plus-2.svg" alt="" /> Add Task
        </Button>
      </header>
      <div className=" bg-white rounded-xl mt-2 p-3">
        <div className=" bg-gray-100 p-1 flex justify-between items-center mt-2 cursor-pointer rounded-md">
          <p>Task Name</p>
          <p className=" px-2 py-1 rounded-md bg-gray-200 text-green-500 font-semibold">Status</p>
        </div>
        <div className=" bg-gray-100 p-1 flex justify-between items-center mt-2 cursor-pointer rounded-md">
          <p>Task Name</p>
          <p className=" px-2 py-1 rounded-md bg-gray-200 text-green-500 font-semibold">Status</p>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
