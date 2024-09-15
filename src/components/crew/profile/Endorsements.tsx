"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import EndorsementsForm from "../update-profile/EndorsementsForm";
import FieldControl from "./FieldControl";

type EndorsementProps = {
  endorsementData: { id: number; text: string; givenBy: string; crew: number }[];
  deleteEndorsement: (id: number) => void;
  isLoadingDeleteEndorsement: boolean;
};

const Endorsements = ({
  endorsementData,
  deleteEndorsement,
  isLoadingDeleteEndorsement,
}: EndorsementProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editableFieldId, setEditableFieldId] = useState<number | undefined>();

  return (
    <div className="bg-white p-6 shadow-md max-w-4xl mx-auto">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">Endorsements</h2>
        <span className="flex gap-3">
          <FaPlus
            onClick={() => {
              setOpenDialog(true);
              setEditableFieldId(undefined);
            }}
            className=" w-6 h-6 cursor-pointer"
          />
        </span>
      </div>
      {endorsementData?.map((item: any, index: number) => (
        <div className="relative" key={index + item.text}>
          <FieldControl
            isLoading={isLoadingDeleteEndorsement}
            deleteItem={deleteEndorsement}
            setEditableFieldId={setEditableFieldId}
            setOpenDialog={setOpenDialog}
            id={item.id}
          />
          <div className="mb-4">
            <p className="text-gray-800">{item?.text}</p>
            <p className="text-sm text-gray-500 mt-1">- {item?.givenBy}</p>
          </div>
          <hr className="my-2" />
        </div>
      ))}
      <EndorsementsForm
        fieldId={editableFieldId}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </div>
  );
};

export default Endorsements;
