"use client";
import React from "react";
import { useGetCompanyTasks } from "@/lib/react-query/queriesAndMutations/company/tasks";
import { cn } from "@/lib/utils";

const ShowTasks = () => {
  const { data: tasksList, isPending, isError } = useGetCompanyTasks();

  return (
    <div className=" bg-white rounded-xl mt-0 p-3">
      {tasksList?.data?.tasks.length === 0 && (
        <p className=" text-center text-gray-500">No tasks found</p>
      )}
      {tasksList?.data?.tasks.map((task: any) => (
        <div
          key={task.id}
          className=" bg-gray-100 p-2 flex justify-between items-center mt-2 rounded-md"
        >
          <p>{task.title}</p>
          <p
            className={cn(
              "px-2 py-1 rounded-md bg-gray-200 text-sm",
              task.completed ? "text-green-500" : "text-yellow-500"
            )}
          >
            {task.completed ? "Completed" : "Pending"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ShowTasks;
