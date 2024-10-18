import { Button } from "@/components/ui/button";
import React from "react";
import ShowTasks from "./ShowTasks";

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
      <ShowTasks />
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
