"use client";
import React from "react";
import Link from "next/link";

import { useGetCompanyTasks } from "@/lib/react-query/queriesAndMutations/company/tasks";
import { cn } from "@/lib/utils";

const ShowSchedule = () => {
  const { data: tasksList, isPending, isError } = useGetCompanyTasks();

  return (
    <div className=" bg-white rounded-xl mt-7 p-3 ">
      {tasksList?.map((task: any) => (
        <div className=" bg-gray-100 p-2 flex justify-between items-center mt-2 rounded-md">
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
      <Link href="#" className=" grid place-content-end cursor-pointer">
        <img src="/icons/right-arrow.svg" alt="arrow" width={30} className=" mt-3" />
      </Link>
    </div>
  );
};

export default ShowSchedule;
