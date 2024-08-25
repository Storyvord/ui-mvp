"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import EducationsForm from "../update-profile/EducationsForm";
import FieldControl from "./FieldControl";

type EducationProps = {
  educationData: {
    academicQualifications: string;
    professionalCourses: string;
    workshopsAttended: string;
    crew: number;
    id: number;
  }[];
  deleteEducation: (id: number) => void;
  isLoadingDeleteEducation: boolean;
};

const Education = ({
  educationData,
  deleteEducation,
  isLoadingDeleteEducation,
}: EducationProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editableFieldId, setEditableFieldId] = useState<number>();

  return (
    <div className="bg-white p-6 shadow-md max-w-4xl mx-auto">
      <div className=" flex justify-between">
        <h2 className="text-xl font-semibold mb-4">Education</h2>
        <span className=" flex gap-3 ">
          <FaPlus
            onClick={() => {
              setOpenDialog(true);
              setEditableFieldId(undefined);
            }}
            className=" w-6 h-6 cursor-pointer"
          />
        </span>
      </div>
      {educationData?.map((item, index: number) => (
        <div className="relative" key={index + item.academicQualifications}>
          <FieldControl
            isLoading={isLoadingDeleteEducation}
            deleteItem={deleteEducation}
            setEditableFieldId={setEditableFieldId}
            setOpenDialog={setOpenDialog}
            id={item.id}
          />
          <div className="mb-4">
            <h3 className="text-[16px] ">Academic Qualifications</h3>
            <p className="text-gray-600 text-sm ml-2">{item?.academicQualifications}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-[16px]">Professional Courses</h3>
            <p className="text-gray-600 text-sm ml-2">{item?.professionalCourses}</p>
          </div>
          <div>
            <h3 className="text-[16px]">Workshops Attended</h3>
            <p className="text-gray-600 text-sm ml-2">{item?.workshopsAttended}</p>
          </div>
          <hr className=" my-2" />
        </div>
      ))}
      <EducationsForm
        fieldId={editableFieldId}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </div>
  );
};

export default Education;
