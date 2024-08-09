import clsx from "clsx";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const items = [
  {
    id: 1,
    title: "Postings",
    heading: "Awaiting work sample verification",
    description:
      " You still have work samples awaiting verification. You can change your verification methods by clicking here.",
  },
  {
    id: 2,
    title: "Application",
    heading: "Apply to a position",
    description: "Once you've applied, you can track the status of your open applications here.",
  },
  {
    id: 3,
    title: "Projects",
    heading: "Start a new project",
    description:
      "A project is a work order between you and a client. A client can start a project with you directly or hire you as a result of an application.",
  },
  {
    id: 4,
    title: "Actions",
    heading: "",
    description: "",
  },
  { id: 5, title: "My network", description: "This is item 5" },
  { id: 6, title: "Reports ", heading: "", description: "" },
  { id: 7, title: "Learn", heading: "", description: "" },
];

const Dashboard = () => {
  return (
    <div className="">
      <nav className=" sm:flex block justify-between">
        <div>
          <h3 className=" text-md text-gray-500"> Welcome, Souvik</h3>
          <h2 className="sm:text-lg sm:font-semibold text-gray-700">
            Here&apos;s your Storyvord Glance
          </h2>
        </div>
        <Link href="/crew/profile" className=" flex gap-4 items-center text-md mt-4">
          Manage your Profile <FaArrowRightLong />
        </Link>
      </nav>
      <main className="grid grid-cols-4 grid-rows-2 gap-6 md:grid-cols-8 p-8">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={clsx(`col-span-4 md:col-span-2 row-span-1 text-gray-900 cursor-pointer`, {
              "row-span-2": item.id === 4,
            })}
          >
            <CardTitle className=" text-lg ml-4 flex gap-4 items-center w-fit hover:scale-105 cursor-pointer">
              {item.title}
            </CardTitle>
            <Card
              className={clsx(" min-h-60 hover:border-2 hover:border-gray-300", {
                "h-full": item.id === 4,
              })}
            >
              <p className="mb-3">{item.heading}</p>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Dashboard;
