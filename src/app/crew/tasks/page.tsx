"use client";
import React, { useState, useEffect } from "react";
import {
  useGetCrewTasks,
  useRequestApprovalForTask,
} from "@/lib/react-query/queriesAndMutations/crew/tasks";
import { taskType } from "@/types";
import Tabs from "@/components/Tabs";
import { useToast } from "@/components/ui/use-toast";
import TaskSkeleton from "@/components/TaskSkeleton";
import AssignTaskCard from "@/components/tasks/AssignTaskCard";
import CreateTask from "@/components/tasks/CreateTask";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { CallSheetFormSchema } from "@/lib/validation";
import { defaultValues, formFields } from "@/constant/formFields/callSheet";
export type ShootFormType = z.infer<typeof CallSheetFormSchema>;


import { FaSearch, FaSortAmountDown } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

const tabs = ["My Task", "My Created Task", "Completed Tasks", "All Tasks"];
const Tasks = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { toast } = useToast();
  const { data: tasks, isLoading: isLoadingTask } = useGetCrewTasks();
  const { mutateAsync, isPending, isError } = useRequestApprovalForTask();
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the popup
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const form = useForm({
    resolver: zodResolver(CallSheetFormSchema),
    defaultValues,
  });



  const handleRequestApproval = async (taskId: number) => {
    const res = await mutateAsync(taskId);
    if (res) {
      toast({
        title: "Success fully send approval request",
        description: "It will approved by your project producer",
      });
    } else {
      toast({ title: "Failed to send approval request", variant: "destructive" });
    }
  };

  return (
    <div className=" w-full">
      <h1 className=" text-2xl text-gray-800 font-semibold py-3">Tasks</h1>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} className="mb-4" />
      <div className=" flex justify-between">
        <button onClick={togglePopup} className =" font-semibold text-white rounded-md bg-green-500 py-2 px-3">+ Create New Task</button>
        <div className=" flex gap-4">
          <button className="flex items-center font-semibold gap-2 py-2 px-3 rounded-md text-gray-500 hover:text-gray-700 border-2 border-gray-900"><FaSearch /> Search</button>
          <button className="flex items-center font-semibold gap-2 py-2 px-3 rounded-md text-gray-500 hover:text-gray-700 border-2 border-gray-900"><FaSortAmountDown /> Sort By</button>         
        </div>
      </div>
      {tasks?.length === 0 && (
        <h1 className=" text-xl text-center text-gray-600 mt-4">No task found</h1>
      )}
      {/* Popup Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex flex-col items-center justify-center transition-opacity duration-300"
          onClick={togglePopup} // Close when clicking outside the modal content
        >
          <div className=" px-6 py-3 bg-slate-100 flex justify-between items-center max-w-lg w-full rounded-t-xl">
          <h2 className="text-2xl font-bold">Create a Task</h2>
          <button onClick={togglePopup}>
          <IoIosCloseCircleOutline className="text-xl" />
          </button>
          </div>
          <div
            className="bg-white p-6 rounded-b-xl shadow-lg max-w-lg w-full relative transform transition-all duration-900 ease-in-out scale-100"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
          >
            
            <div>
              <input type="text" />
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={togglePopup}
                className=" py-2 px-4 rounded border-2 border-transparent hover:border-2 hover:border-gray-300 transition duration-300"
              >
                Cancel
              </button>
              <button
              //logic to store data in db goes here
              className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300"
              >
                  Create
              </button>
            </div>
            
          </div>
        </div>
      )}
      {isLoadingTask && <TaskSkeleton />}
      {activeTab === tabs[0] &&
        tasks?.map((task: taskType) => (
          <AssignTaskCard
            key={task.id}
            handleRequestApproval={handleRequestApproval}
            isLoading={isPending}
            task={task}
          />
        ))}
      {activeTab === tabs[1] &&
        tasks?.map((task: taskType) => {
          if (!task.completed) {
            return (
              <AssignTaskCard
                key={task.id}
                handleRequestApproval={handleRequestApproval}
                isLoading={isPending}
                task={task}
              />
            );
          }
        })}
      {activeTab === tabs[2] &&
        tasks?.map((task: taskType) => {
          if (task.completed) {
            return (
              <AssignTaskCard
                key={task.id}
                handleRequestApproval={handleRequestApproval}
                isLoading={isPending}
                task={task}
              />
            );
          }
        })}
    </div>
  );
};

export default Tasks;
