"use client";
import React, { FC, useState, useEffect } from "react";
import { getFileTypeFromUrl } from "@/lib/utils";
import { BsFiletypePdf } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { FaRegFileImage } from "react-icons/fa";
import { GrDocumentTxt } from "react-icons/gr";
import { BsFiletypeDocx } from "react-icons/bs";
import { Skeleton } from "@/components/ui/skeleton";

const renderFilePreview = (fileUrl: string, fileType: string | null) => {
  if (!fileType) {
    return <Skeleton className=" w-full h-full"/>
  }

  if (fileUrl.includes("png") || fileUrl.includes("jpg") || fileUrl.includes("jpeg"))
    return <FaRegFileImage className="w-12 h-12" />;
  else if (fileUrl.includes("pdf")) return <BsFiletypePdf className=" w-12 h-12" />;
  else if (fileUrl.includes("plain")) return <GrDocumentTxt className=" w-12 h-12" />;
  else if (fileUrl.includes("msword") || fileUrl.includes("vnd"))
    return <BsFiletypeDocx className=" w-12 h-12" />;
};

interface FileCardProps {
  file: {
    id: number;
    file: string;
    name: string;
    folder: number;
  };
  onDeleteFile: (fileId: number) => void;
  onPreview: (fileUrl: string, fileName: string, fileType: string) => void;
}

const FileCard: FC<FileCardProps> = ({ file, onDeleteFile, onPreview }) => {
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFileType() {
      const type = await getFileTypeFromUrl(file.file);
      setFileType(type);
    }

    fetchFileType();
  }, [file.file]);

  return (
    <div
      className="relative h-36 shadow-md rounded-lg bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => onPreview(file.file, file.name, fileType || "")}
    >
      <div className="h-[80%] flex items-center justify-center p-2">
        {renderFilePreview(file.file, fileType)}
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-white flex items-center justify-between py-2 px-4 border-t border-gray-200">
        <div className="flex-grow">
          <h3 className="text-black font-medium">{file.name}</h3>
        </div>
        <button
          className="text-red-500"
          onClick={(e) => {
            e.stopPropagation(); // Prevent the preview from opening when clicking delete
            onDeleteFile(file.id);
          }}
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default FileCard;
