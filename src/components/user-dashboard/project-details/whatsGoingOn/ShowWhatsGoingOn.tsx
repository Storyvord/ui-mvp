"use client";
import React from "react";
import Link from "next/link";

import { useGetCompanyTasks } from "@/lib/react-query/queriesAndMutations/company/tasks";
import { cn } from "@/lib/utils";
import Image from "next/image";

const tasksList = [
  { id: 1, title: "Compile Updates on Current Production Phases", completed: false },
  { id: 2, title: "Summarize Recent Progress in Post-Production", completed: true },
];

const ShowWhatsGoingOn = () => {
  // const { data: tasksList, isPending, isError } = useGetCompanyTasks();

  return (
    <div className=" bg-white rounded-xl mt-5 p-3">
      {tasksList?.map((task: any) => (
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

export default ShowWhatsGoingOn;
