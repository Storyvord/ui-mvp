import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ComplianceTaskProps = {
  task: {
    id: number;
    description: string;
    completed: boolean;
  };
  onUpdate: (updatedTask: { description?: string; completed?: boolean }) => void;
  onRemove: () => void;
};

const ComplianceTask: React.FC<ComplianceTaskProps> = ({ task, onUpdate, onRemove }) => {
  return (
    <div className="flex items-center space-x-4 mb-3">
      <Input
        placeholder="Task Description"
        value={task.description}
        onChange={(e) => onUpdate({ description: e.target.value })}
        className="flex-1"
      />
      <input
        type="checkbox"
        checked={task.completed}
        onChange={(e) => onUpdate({ completed: e.target.checked })}
        className="w-5 h-5"
      />
      <Button variant="ghost" className="text-red-600" onClick={onRemove}>
        Remove
      </Button>
    </div>
  );
};

export default ComplianceTask;
