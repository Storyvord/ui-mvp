"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { taskFormType, taskType } from "@/types";
import ShowTasks from "./ShowTasks";
import CreateTask from "@/components/tasks/CreateTask";
import { useGetSendInvitationsList } from "@/lib/react-query/queriesAndMutations/company/employee";
import { useCreateNewCompanyTask } from "@/lib/react-query/queriesAndMutations/company/tasks";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

const Tasks = () => {
  const [formOpen, setFormOpen] = useState(false);
  const { toast } = useToast();

  const { mutateAsync: createNewTaskMutation } = useCreateNewCompanyTask();
  const { data: employee_list } = useGetSendInvitationsList();
  const employeeList = employee_list?.accepted.map(
    (employee: { firstName: string; invited_user: { id: number }; employee_email: string }) => ({
      value: employee.invited_user.id,
      label: employee.firstName || employee.employee_email,
    })
  );

  const createTask = async (task: taskFormType) => {
    const newTask = {
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      completed: false,
      completion_requested: false,
      assigned_to: task.assigned_to,
      requester: null,
    };

    const res = await createNewTaskMutation(newTask);
    if (res) {
      toast({ title: "Task created" });
    } else {
      toast({ title: "Failed to create new task", variant: "destructive" });
    }
  };
  return (
    <div className=" p-2">
      <header className=" flex justify-between items-center">
        <span className=" flex gap-2 items-center">
          <Image height={20} width={20} src="/icons/task.svg" alt="plus-icon" />
          <h1 className=" text-lg">My Task</h1>
        </span>
        <Button onClick={() => setFormOpen(true)} className=" flex gap-2">
          <Image height={20} width={20} src="/icons/plus-2.svg" alt="plus-icon" /> Add Task
        </Button>
      </header>
      <ShowTasks />
      <CreateTask
        setFormOpen={setFormOpen}
        formOpen={formOpen}
        handleSubmission={createTask}
        crewList={employeeList}
      />
    </div>
  );
};

export default Tasks;
