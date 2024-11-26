"use client";
import React from "react";
import Image from "next/image";
import ShowSchedule from "./ShowSchedule";
import Link from "next/link";

const ShootingSchedule = () => {
  return (
    <div className="p-2 relative">
      <h1 className="text-xl font-semibold">Shooting Schedule</h1>

      <main className="bg-white p-2 mt-4 rounded-3xl border-2 overflow-y-scroll h-60 hide-scrollbar">
        <header className="flex justify-between items-center px-4 sticky top-0 bg-white z-10">
          <Image src="/icons/todo.svg" alt="" width={20} height={20} />
        </header>
        <ShowSchedule />
      </main>
      <Link href="#" className=" grid place-content-end cursor-pointer absolute bottom-5 right-5">
        <Image height={25} width={25} src="/icons/right-arrow.svg" alt="arrow" className=" mt-3" />
      </Link>
    </div>
  );
};

export default ShootingSchedule;
