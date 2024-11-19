import React from "react";
import ComplianceTask from "./ComplianceTask";
import { Button } from "@/components/ui/button";

type ComplianceTaskProps = {
  id: number;
  description: string;
  completed: boolean;
};

type ComplianceCategoryProps = {
  title: string;
  tasks: ComplianceTaskProps[];
  onUpdate: (tasks: ComplianceTaskProps[]) => void;
};

const ComplianceCategory: React.FC<ComplianceCategoryProps> = ({ title, tasks, onUpdate }) => {
  const handleAddTask = () => {
    const newTask = { id: Date.now(), description: "", completed: false };
    onUpdate([...tasks, newTask]);
  };

  const handleUpdateTask = (id: number, updatedTask: Partial<ComplianceTaskProps>) => {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task));
    onUpdate(updatedTasks);
  };

  const handleRemoveTask = (id: number) => {
    onUpdate(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {tasks.map((task) => (
        <ComplianceTask
          key={task.id}
          task={task}
          onUpdate={(updatedTask) => handleUpdateTask(task.id, updatedTask)}
          onRemove={() => handleRemoveTask(task.id)}
        />
      ))}
      <Button className="mt-4 bg-green-500 hover:bg-green-600" onClick={handleAddTask}>
        Add Task
      </Button>
    </div>
  );
};

export default ComplianceCategory;
