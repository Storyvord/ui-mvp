"use client";
import React, { FC } from "react";
import { useParams, useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";
import FileManagement from "@/components/user-dashboard/project-details/general/file-documents/FileManagement";

const RoomPage: FC = () => {
  const router = useRouter();
  const { id: projectId } = useParams();

  
  const handleBack = () => {
    router.push(`/project-details/${projectId}/file-documents`);
  };

  return (
    <div className="p-4">
      <button onClick={handleBack} className="mb-4 flex items-center gap-4">
        <IoMdArrowRoundBack /> Back
      </button>
      <FileManagement />
    </div>
  );
};

export default RoomPage;
