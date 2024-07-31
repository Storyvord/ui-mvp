"use client";

import CreateTask from "@/components/tasks/CreateTask";
import TaskCard from "@/components/tasks/TaskCard";
import TaskNavbar from "@/components/tasks/TaskNavbar";
import ToolBar from "@/components/tasks/ToolBar";
import {
  useCompleteTask,
  useCreateNewTask,
  useDeleteTask,
  useGetTasks,
  useGetUserDetails,
} from "@/lib/react-query/queriesAndMutations";
import { taskFormType, taskType } from "@/types";
import React, { useCallback, useEffect, useState } from "react";
import TaskSkeleton from "./TaskSkeleton";

const TaskPage = ({ params }: { params: { id: string } }) => {
  const { data: tasksList, isLoading: isLoadingTask } = useGetTasks(params.id);
  const { mutateAsync: createNewTaskMutation } = useCreateNewTask();
  const { mutateAsync: deleteTaskMutation } = useDeleteTask();
  const { mutateAsync: completeTaskMutation } = useCompleteTask();
  const {data: userDetails} = useGetUserDetails()

  const [tasks, setTasks] = useState<taskType[]>([]);

  useEffect(() => {
    if (tasksList) setTasks([...tasksList]);
  }, [params.id, tasksList]);

  const completeTask = (task: taskType) => {
    const updatedTasks = { ...task, completed: !task.completed };

    completeTaskMutation({ taskId: task.id, taskData: updatedTasks });
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
      assigned_to: 2,
      requester: 2,
      created_by: userDetails?.id,
    };

    try {
      await createNewTaskMutation({ taskData: newTask, projectId: params.id });
    } catch (error) {
      console.log("failed to create new task", error);
    }
  };

  const editTask = (id: number, task: taskType) => {
    console.log(task);
    const updatedTasks = {
      ...task,
      title: task.title,
      desc: task.description,
      deadline: task.due_date,
    };
    completeTaskMutation({ taskId: id, taskData: updatedTasks });
  };

  const [sortBy, setSortBy] = useState<
    "id" | "due_date" | "title" | "completed"
  >("id");
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
        handleSort={(value: "id" | "due_date" | "title" | "completed") =>
          setSortBy(value)
        }
      />
      <CreateTask
        setFormOpen={setFormOpen}
        formOpen={formOpen}
        handleSubmission={createTask}
      />
      {isLoadingTask ? (
        <TaskSkeleton />
      ) : (
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
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TaskPage;
