import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type BudgetItemProps = {
  item: {
    id: number;
    description: string;
    cost: number;
  };
  onUpdate: (updatedItem: { description?: string; cost?: number }) => void;
  onRemove: () => void;
};

const BudgetItem: React.FC<BudgetItemProps> = ({ item, onUpdate, onRemove }) => {
  return (
    <div className="flex items-center space-x-4 mb-3">
      <Input
        placeholder="Description"
        value={item.description}
        onChange={(e) => onUpdate({ description: e.target.value })}
        className="flex-1"
      />
      <Input
        placeholder="Cost"
        type="number"
        value={item.cost}
        onChange={(e) => onUpdate({ cost: parseFloat(e.target.value) || 0 })}
        className="w-24"
      />
      <Button variant="ghost" className="text-red-600" onClick={onRemove}>
        Remove
      </Button>
    </div>
  );
};

export default BudgetItem;
