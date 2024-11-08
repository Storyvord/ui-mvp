"use client";
import { FC, useState } from "react";
import NavbarItem from "./NavbarItem";

const taskNavbarMenu = [
  {
    name: "All Tasks",
    type: "all",
    link: "/task",
  },
  {
    name: "Pending",
    type: "pending",
    link: "/report",
  },
  {
    name: "Completed",
    type: "completed",
    link: "/report",
  },
  {
    name: "Request Approval",
    type: "requested-approval",
  },
  {
    name: "Assign Task",
    type: "assign-task",
  },
];

interface TaskNavbarProps {
  taskFilter: string;
  setTaskFilter: (type: string) => void;
}

const TaskNavbar: FC<TaskNavbarProps> = ({ taskFilter, setTaskFilter }) => {
  return (
    //code a for a navbar
    <div className="w-full flex flex-wrap gap-2 ">
      {taskNavbarMenu.map((item) => {
        return (
          <div
            key={item.name}
            onClick={() => setTaskFilter(item.type)}
            className={`${taskFilter == item.type ? "active" : ""}`}
          >
            <NavbarItem text={item.name} isActive={taskFilter == item.type} />
          </div>
        );
      })}
    </div>
  );
};

export default TaskNavbar;
