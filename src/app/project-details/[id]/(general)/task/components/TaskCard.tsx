"use client"

import { taskFormType, taskType } from '@/types'
import { FC, useState } from 'react'
import { Card } from '../../../../../../components/ui/card'
import { Button } from '../../../../../../components/ui/button'
import { PencilIcon, Trash2 } from 'lucide-react'
import { Checkbox } from '../../../../../../components/ui/checkbox'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../../../../components/ui/accordion'
import CreateTask from './CreateTask'

interface TaskCardProps {
  task: taskType,
  completeTask: (id:number) => void,
  deleteTask: (id:number) => void,
  editTask: (id:number, task: taskFormType) => void
}

const TaskCard: FC<TaskCardProps> = ({task, completeTask, deleteTask, editTask}) => {

    const [formOpen, setFormOpen] = useState(false);
  return (
    <Card className='min-h-[60px] py-0 px-2 rounded-sm'>
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <div className='flex py-2 relative pl-6 gap-2 items-center'>
                    <div className={`absolute top-2 left-2 h-[47px] w-[6px] ${task.status ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <div className='flex w-full h-full items-center gap-2 justify-between'>
                        <div className='flex items-center gap-3'>
                            <Checkbox checked={task.status} onClick={() => completeTask(task.id)}/>
                            <h1 className='font-sans text-gray-700 font-bold text-[14px] sm:text-[16px]'>{task.title}</h1>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <div className='hidden sm:block font-sans mr-10 text-center'>
                                <p className="text-black text-[10px]">Task Deadline</p>
                                <p className="text-gray-500 text-[14px]">{task.deadline}</p>
                            </div>
                            <Button variant="outline" size="icon" onClick={() => setFormOpen(!formOpen)}>
                                <PencilIcon className='w-5 h-5'/>
                            </Button>
                            <CreateTask formOpen={formOpen} handleSubmission={(newTask)=>editTask(task.id, newTask)} taskEditing={task} setFormOpen={setFormOpen}/>
                            <Button variant="destructive" size="icon" onClick={() => deleteTask(task.id)}>
                                <Trash2 className='w-5 h-5'/>
                            </Button>
                        </div>
                    </div>
                    <AccordionTrigger className=''></AccordionTrigger>
                </div>
                <AccordionContent>
                    <p className='text-gray-500'>
                        <span className='font-sans text-gray-700 font-bold text-[14px] mr-1'>Task Description: </span>
                        {task.desc}
                    </p>
                    <p className='text-gray-500 sm:hidden'>
                        <span className='font-sans text-gray-700 font-bold text-[14px] mr-1'>Task DeadLine: </span>
                        {task.deadline}
                    </p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        
    </Card>
  )
}

export default TaskCard