"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import BudgetCategory from "@/components/user-dashboard/project-details/planning/budget/BudgetCategory";

type BudgetItem = {
  id: number;
  description: string;
  cost: number;
};

const initialCategories = {
  preProduction: [
    { id: 1, description: "Location Scouting", cost: 500 },
    { id: 2, description: "Scriptwriting", cost: 700 },
  ],
  production: [
    { id: 1, description: "Equipment Rental", cost: 2000 },
    { id: 2, description: "Crew Fees", cost: 3000 },
  ],
  postProduction: [
    { id: 1, description: "Editing", cost: 1500 },
    { id: 2, description: "Subtitles and Translation", cost: 400 },
  ],
};

const BudgetPage: React.FC = () => {
  const [budget, setBudget] = useState(initialCategories);

  // Update budget based on category and updated items
  const handleUpdate = (category: string, updatedItems: BudgetItem[]) => {
    setBudget((prev) => ({ ...prev, [category]: updatedItems }));
  };

  // Calculate total
  const calculateTotal = () => {
    return Object.values(budget)
      .flat()
      .reduce((acc, item) => acc + item.cost, 0);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Budget Overview</h1>

      <BudgetCategory
        title="Pre-Production"
        items={budget.preProduction}
        onUpdate={(items) => handleUpdate("preProduction", items)}
      />
      <BudgetCategory
        title="Production"
        items={budget.production}
        onUpdate={(items) => handleUpdate("production", items)}
      />
      <BudgetCategory
        title="Post-Production"
        items={budget.postProduction}
        onUpdate={(items) => handleUpdate("postProduction", items)}
      />

      <div className="mt-8 flex justify-between items-center">
        <span className="text-lg font-semibold">Total Budget:</span>
        <span className="text-xl font-bold">${calculateTotal().toLocaleString()}</span>
      </div>
      <Button className="mt-4">Save Budget</Button>
    </div>
  );
};

export default BudgetPage;
