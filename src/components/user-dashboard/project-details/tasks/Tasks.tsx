"use client";
import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import ShowTasks from "./ShowTasks";
import Link from "next/link";

const Tasks = () => {
  return (
    <div className=" p-2 relative">
      <h1 className=" text-xl font-semibold">Project Task</h1>

      <main className=" bg-white p-2 rounded-3xl border-2 mt-4 overflow-y-scroll h-60 hide-scrollbar">
        <header className=" flex justify-between items-center px-4">
          <Image src="/icons/todo.svg" alt="" width={20} height={20} />
          <Button className=" flex gap-2 bg-gray-100 text-black">
            <Image height={25} width={25} src="/icons/plus.svg" alt="" /> Add Task
          </Button>
        </header>
        <ShowTasks />
      </main>
      <Link href="#" className=" grid place-content-end cursor-pointer absolute bottom-5 right-5">
        <Image height={25} width={25} src="/icons/right-arrow.svg" alt="arrow" className=" mt-3" />
      </Link>
    </div>
  );
};

export default Tasks;
