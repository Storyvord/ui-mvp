"use client"

import CreateTask from './components/CreateTask'
import TaskCard from '@/app/project-details/[id]/(general)/task/components/TaskCard'
import TaskNavbar from './components/TaskNavbar'
import ToolBar from './components/ToolBar'
import { taskFormType, taskType } from '@/types'
import { tempTaskList } from '@/utils/constant'
import React, { useCallback, useEffect, useState } from 'react'

const TaskPage = () => {
  const [tasks,  setTasks] = useState<taskType[]>([]);
  useEffect(() => {
    setTasks([...tempTaskList])
  }, [])
  
  
  const completeTask = (id:number) => {
    const updatedTasks=[...tasks].map((item=>{
      if(item.id===id){
        item.status= !item.status;
      }
      return item;
    }))
    setTasks(updatedTasks)
  }

  const deleteTask = (id:number) => {
    const updatedTasks=[...tasks].filter((item)=>{
        return item.id!==id;
    });
    setTasks(updatedTasks)
  }

  
  const createTask = (task: taskFormType) => {
      const newTask: taskType = {
        id: tasks[tasks.length-1].id+1,
        title: task.title,
        desc: task.desc,
        deadline: task.deadline,
        status: false,
      };
      setTasks([...tasks, newTask]);
  };

  
  const editTask = (id:number, task: taskFormType) => {
    const updatedTasks=[...tasks].map((item)=>{
      if(item.id===id){
        return {
          ...item,
          title: task.title || item.title,
          desc: task.desc || item.desc,
          deadline: task.deadline || item.deadline,
        }
      }
      return item;
    })
    setTasks(updatedTasks)
  };
  const [sortBy, setSortBy] = useState<"id" | "deadline" | "title" | "status">("id")
  const [taskFilter, setTaskFilter] = useState("all")
  const [searchFilter, setSearchFilter] = useState("")
 const getSortTasks = useCallback(() => {
    let filteredTasks = [...tasks].filter((task) => {
        return task.title.toLowerCase().includes(searchFilter.toLowerCase());
    });
    if (taskFilter === "pending") {
      filteredTasks = [...filteredTasks].filter((task) => !task.status);
    } else if (taskFilter === "completed") {
      filteredTasks = [...filteredTasks].filter((task) => task.status);
    }
    const sortedTasks = [...filteredTasks].sort((a, b) => {
      if(sortBy==="id"){
        return b.id - a.id
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
    <div>
      <TaskNavbar taskFilter={taskFilter} setTaskFilter={setTaskFilter}/>
      <hr></hr>
      <ToolBar searchFilter={searchFilter} setSearchFilter={setSearchFilter} formOpen={formOpen} setFormOpen={setFormOpen} sortBy={sortBy} handleSort={(value:"id" |"deadline" | "title" | "status")=>setSortBy(value)}/>
      <CreateTask setFormOpen={setFormOpen} formOpen={formOpen} handleSubmission={createTask}/>
      <div className='w-full mt-4 flex flex-col gap-2'>
        {
          sortedTasks.length===0 ? <p className='text-center text-gray-500'>No tasks found</p>:
          sortedTasks.map((task)=>(
            <TaskCard key={task.id} task={task} completeTask={completeTask} deleteTask={deleteTask} editTask={editTask}/>
          ))
        }
      </div>
    </div>
  )
}

export default TaskPage
