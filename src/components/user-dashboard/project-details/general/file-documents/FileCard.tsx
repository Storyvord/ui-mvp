"use client"
import React, { FC } from "react";
import Image from "next/image";
import { Trash2, FileAxis3D } from "lucide-react";

interface FileCardProps {
  name: string;
  fileName: string;
  fileType: string;
  fileData: string;
  onPreview: (fileData: string, fileName: string, fileType: string) => void;
  onDelete: () => void;
}

const FileCard: FC<FileCardProps> = ({
  name,
  fileName,
  fileType,
  fileData,
  onPreview,
  onDelete,
}) => {
  const renderFilePreview = (fileData: string, fileType: string) => {
    const byteString = atob(fileData.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: fileType });
    const url = URL.createObjectURL(blob);

    if (fileType && fileType.startsWith("image/")) {
      return (
        <Image
          src={url}
          alt={fileName}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg cursor-pointer"
        />
      );
    } else {
      return <FileAxis3D className="text-blue-500 w-20 h-20 stroke-1" />;
    }
  };

  return (
    <div className="relative w-full min-h-60 shadow-md rounded-lg bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div
        className="h-[80%] flex items-center justify-center"
        onClick={() => onPreview(fileData, fileName, fileType)}
      >
        {renderFilePreview(fileData, fileType)}
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-white flex items-center justify-between py-2 px-4 border-t border-gray-200">
        <div onClick={() => onPreview(fileData, fileName, fileType)} className="flex-grow">
          <h3 className="text-black font-medium">{name}</h3>
        </div>
        <button className="text-red-500" onClick={onDelete}>
          <Trash2 size={24} />
        </button>
      </div>
    </div>
  );
};

export default FileCard;
