"use client";
import React, { useState } from "react";
import TaskCard from "@/components/crew/TaskCard";
import { useGetCrewTasks } from "@/lib/react-query/queriesAndMutations/crew/tasks";
import { taskType } from "@/types";
import Tabs from "@/components/Tabs";

const tabs = ["All Tasks", "Pending", "completed"];
const Tasks = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { data } = useGetCrewTasks();
  const completeTask = () => {
    return;
  };
  return (
    <div className=" w-full">
      <h1 className=" text-2xl text-gray-800 font-semibold">Tasks</h1>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} className="mb-4" />
      {activeTab === tabs[0] &&
        data?.map((task: taskType) => (
          <TaskCard key={task.id} completeTask={completeTask} task={task} />
        ))}
      {activeTab === tabs[1] &&
        data?.map((task: taskType) => {
          if (!task.completed) {
            return <TaskCard key={task.id} completeTask={completeTask} task={task} />;
          }
        })}
      {activeTab === tabs[2] &&
        data?.map((task: taskType) => {
          if (task.completed) {
            return <TaskCard key={task.id} completeTask={completeTask} task={task} />;
          }
        })}
    </div>
  );
};

export default Tasks;
