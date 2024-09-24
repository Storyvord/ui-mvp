"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  useCompanyTaskCompletionApproval,
  useCompanyTaskCompletionRequest,
  useCreateNewCompanyTask,
  useDeleteCompanyTask,
  useGetCompanyEmployeeTasks,
  useGetCompanyTasks,
  useUpdateCompanyTask,
} from "@/lib/react-query/queriesAndMutations/company/tasks";
import CreateTask from "@/components/tasks/CreateTask";
import TaskCard from "@/components/tasks/TaskCard";
import TaskNavbar from "@/components/tasks/TaskNavbar";
import ToolBar from "@/components/tasks/ToolBar";
import { taskFormType, taskType } from "@/types";
import TaskSkeleton from "@/components/TaskSkeleton";
import { useToast } from "@/components/ui/use-toast";
import { useGetSendInvitationsList } from "@/lib/react-query/queriesAndMutations/company/employee";
import AssignTaskCard from "@/components/tasks/AssignTaskCard";

const TaskPage = ({ params }: { params: { id: string } }) => {
  const { data: tasksList, isPending: isLoadingTask, isError: isErrorTask } = useGetCompanyTasks();
  const { data: employeeTaskList } = useGetCompanyEmployeeTasks();
  const { mutateAsync: createNewTaskMutation } = useCreateNewCompanyTask();
  const { mutateAsync: deleteTaskMutation } = useDeleteCompanyTask();
  const { mutateAsync: updateTaskMutation } = useUpdateCompanyTask();
  const { mutateAsync: taskApprovalMutation, isPending: isLoadingApprovedTask } =
    useCompanyTaskCompletionApproval();
  const { mutateAsync: taskRequestCompletionMutation, isPending: isLoadingRequestTask } =
    useCompanyTaskCompletionRequest();
  const { data: employee_list } = useGetSendInvitationsList();
  const employeeList = employee_list?.accepted.map(
    (employee: { firstName: string; invited_user: { id: number }; employee_email: string }) => ({
      value: employee.invited_user.id,
      label: employee.firstName || employee.employee_email,
    })
  );

  const [tasks, setTasks] = useState<taskType[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (tasksList) setTasks([...tasksList]);
  }, [params.id, tasksList]);

  const completeTask = (task: taskType) => {
    const updatedTasks = { ...task, completed: !task.completed };
    updateTaskMutation({ taskId: task.id, taskData: updatedTasks });
  };

  const deleteTask = async (id: number) => {
    try {
      await deleteTaskMutation(id);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task: taskFormType) => {
    const newTask = {
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      completed: false,
      completion_requested: false,
      project: params.id,
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

  const editTask = (id: number, task: taskType) => {
    const updatedTasks = {
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      assigned_to: task.assigned_to,
    };
    updateTaskMutation({ taskId: id, taskData: updatedTasks });
  };

  const approveTaskCompletion = async (taskId: number) => {
    const res = await taskApprovalMutation(taskId);
    if (res) {
      toast({ title: "Success fully approved task" });
    } else {
      toast({ title: "Failed approved task", variant: "destructive" });
    }
  };

  const requestTaskCompletion = async (taskId: number) => {
    const res = await taskRequestCompletionMutation(taskId);
    if (res) {
      toast({ title: "Success fully request task approval" });
    } else {
      toast({ title: "Failed to request task approval", variant: "destructive" });
    }
  };

  const [sortBy, setSortBy] = useState<"id" | "due_date" | "title" | "completed">("id");
  const [taskFilter, setTaskFilter] = useState("all");
  const [searchFilter, setSearchFilter] = useState("");

  const getSortTasks = useCallback(() => {
    let filteredTasks = [...tasks].filter((task) => {
      return task.title.toLowerCase().includes(searchFilter.toLowerCase());
    });
    if (taskFilter === "pending") {
      filteredTasks = [...filteredTasks].filter((task) => !task.completed);
    } else if (taskFilter === "completed") {
      filteredTasks = [...filteredTasks].filter((task) => task.completed);
    } else if (taskFilter === "requested-approval") {
      filteredTasks = [...filteredTasks].filter((task) => task.completion_requested);
    }
    const sortedTasks = [...filteredTasks].sort((a, b) => {
      if (sortBy === "id") {
        return b.id - a.id;
      }
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }
      if (a[sortBy] > b[sortBy]) {
        return 1;
      }
      return 0;
    });
    return sortedTasks;
  }, [sortBy, tasks, taskFilter, searchFilter]);

  const sortedTasks = getSortTasks();

  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="px-4">
      <TaskNavbar taskFilter={taskFilter} setTaskFilter={setTaskFilter} />
      <hr></hr>
      <ToolBar
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
        formOpen={formOpen}
        setFormOpen={setFormOpen}
        sortBy={sortBy}
        handleSort={(value: "id" | "due_date" | "title" | "completed") => setSortBy(value)}
      />
      <CreateTask
        setFormOpen={setFormOpen}
        formOpen={formOpen}
        handleSubmission={createTask}
        crewList={employeeList}
      />
      {isLoadingTask && <TaskSkeleton />}
      {isErrorTask && <p className=" text-center text-red-600">Failed to get your tasks</p>}
      {taskFilter === "assign-task" || (
        <div className="w-full mt-4 flex flex-col gap-2">
          {sortedTasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks found</p>
          ) : (
            sortedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                completeTask={completeTask}
                deleteTask={deleteTask}
                editTask={editTask}
                crewList={employeeList}
                approveTaskCompletion={approveTaskCompletion}
                isLoading={isLoadingApprovedTask}
              />
            ))
          )}
        </div>
      )}
      {taskFilter === "assign-task" &&
        employeeTaskList?.map((task: any) => (
          <AssignTaskCard
            key={task.id}
            task={task}
            isLoading={isLoadingRequestTask}
            handleRequestApproval={requestTaskCompletion}
          />
        ))}
    </div>
  );
};

export default TaskPage;
