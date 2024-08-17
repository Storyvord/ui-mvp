"use client";

import { taskType } from "@/types";
import { FC } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface TaskCardProps {
  task: taskType;
  completeTask: (task: taskType) => void;
}

const TaskCard: FC<TaskCardProps> = ({ task, completeTask }) => {
  console.log(task.project);

  return (
    <Card className="min-h-[60px] py-0 px-2 rounded-sm">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <div className="flex py-2 relative pl-6 gap-2 items-center">
            <div
              className={`absolute top-2 left-2 h-[47px] w-[6px] ${task.completed ? "bg-green-500" : "bg-yellow-500"}`}
            ></div>
            <div className="flex w-full h-full items-center gap-2 justify-between">
              <div className="flex items-center gap-3">
                <Checkbox checked={task.completed} onClick={() => completeTask(task)} />
                <span className=" sm:flex gap-12">
                  <h1 className="font-sans text-gray-700 font-bold text-[14px] sm:text-[16px]">
                    {task.title}
                  </h1>
                  <h3 className="text-sm">Project:- {task.project}</h3>
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="hidden sm:block font-sans mr-10 text-center">
                  <p className="text-black text-[10px]">Task Deadline</p>
                  <p className="text-gray-500 text-[14px]">{task.due_date}</p>
                </div>
              </div>
            </div>
            <AccordionTrigger className=""></AccordionTrigger>
          </div>
          <AccordionContent>
            <p className="text-gray-500">
              <span className="font-sans text-gray-700 font-bold text-[14px] mr-1">
                Task Description:{" "}
              </span>
              {task.description}
            </p>
            <p className="text-gray-500 sm:hidden">
              <span className="font-sans text-gray-700 font-bold text-[14px] mr-1">
                Task DeadLine:{" "}
              </span>
              {task.due_date}
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default TaskCard;
