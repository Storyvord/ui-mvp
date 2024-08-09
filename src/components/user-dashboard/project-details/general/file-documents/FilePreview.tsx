"use client"
import React, { FC } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface FilePreviewProps {
  fileName: string;
  fileType: string;
  fileUrl: string;
  onClose: () => void;
}

const FilePreview: FC<FilePreviewProps> = ({ fileName, fileType, fileUrl, onClose }) => {
  const renderPreviewContent = (fileType: string, url: string) => {
    if (fileType && fileType.startsWith("image/")) {
      return (
        <div className="relative w-full h-full">
          <Image
            src={url}
            alt=""
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
      );
    } else if (fileType === "application/pdf") {
      return (
        <iframe src={url} className="w-full h-full border-0" title=""></iframe>
      );
    } else {
      return (
        <p>
          File preview not supported for this file type. Please download the file to view it.
        </p>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 py-8">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 h-full max-h-screen mx-auto flex flex-col transform transition-transform duration-300">
        <div className="flex justify-between items-center pb-2 mb-4 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-medium">{fileName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-grow overflow-auto">
          {renderPreviewContent(fileType, fileUrl)}
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
