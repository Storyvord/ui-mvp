"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import CreditsForm from "../update-profile/CreditsForm";
import FieldControl from "./FieldControl";

type CreditProps = {
  creditsData: {
    title: string;
    year: string;
    role: string;
    production: string;
    type_of_content: string;
    tags: string;
    crew: number;
    id: number;
  }[];
  deleteCredit: (id: number) => void;
  isLoadingDeleteCredit: boolean;
};

const fields = [
  { key: "title", label: "Title" },
  { key: "year", label: "Year" },
  { key: "role", label: "Role" },
  { key: "production", label: "Production" },
  { key: "type_of_content", label: "Type of Content" },
  { key: "tags", label: "Tags" },
];

const Credit = ({ creditsData, deleteCredit, isLoadingDeleteCredit }: CreditProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editableFieldId, setEditableFieldId] = useState<number>();

  return (
    <div className="bg-white p-6 shadow-md max-w-4xl mx-auto">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">Credit</h2>
        <span className="flex gap-3">
          <FaPlus
            onClick={() => {
              setOpenDialog(true);
              setEditableFieldId(undefined);
            }}
            className="w-6 h-6 cursor-pointer"
          />
        </span>
      </div>
      {creditsData?.map((item, index) => (
        <div key={index + item.title} className="relative mb-8">
          <FieldControl
            isLoading={isLoadingDeleteCredit}
            deleteItem={deleteCredit}
            setEditableFieldId={setEditableFieldId}
            setOpenDialog={setOpenDialog}
            id={item.id}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.key} className="flex items-center gap-4">
                <h3 className="text-[16px] font-medium">{field.label}:</h3>
                <p className="text-gray-700 text-sm">{item[field.key as keyof typeof item]}</p>
              </div>
            ))}
          </div>
          <hr className="my-2" />
        </div>
      ))}
      <CreditsForm
        fieldId={editableFieldId}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </div>
  );
};

export default Credit;
