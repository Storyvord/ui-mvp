import React from "react";
import BudgetItem from "./BudgetItem";
import { Button } from "@/components/ui/button";

type BudgetItemProps = {
  id: number;
  description: string;
  cost: number;
};

type BudgetCategoryProps = {
  title: string;
  items: BudgetItemProps[];
  onUpdate: (items: BudgetItemProps[]) => void;
};

const BudgetCategory: React.FC<BudgetCategoryProps> = ({ title, items, onUpdate }) => {
  // Add a new line item
  const handleAddItem = () => {
    const newItem = { id: Date.now(), description: "", cost: 0 };
    onUpdate([...items, newItem]);
  };

  // Update a specific item based on its id
  const handleUpdateItem = (id: number, updatedItem: Partial<BudgetItemProps>) => {
    const updatedItems = items.map((item) => (item.id === id ? { ...item, ...updatedItem } : item));
    onUpdate(updatedItems);
  };

  // Remove an item based on its id
  const handleRemoveItem = (id: number) => {
    onUpdate(items.filter((item) => item.id !== id));
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {items.map((item) => (
        <BudgetItem
          key={item.id}
          item={item}
          onUpdate={(updatedItem) => handleUpdateItem(item.id, updatedItem)}
          onRemove={() => handleRemoveItem(item.id)}
        />
      ))}
      <Button className="mt-4 bg-green-500 hover:bg-green-600" onClick={handleAddItem}>
        Add Item
      </Button>
    </div>
  );
};

export default BudgetCategory;
