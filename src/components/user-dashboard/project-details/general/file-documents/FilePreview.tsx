"use client";
import React, { FC } from "react";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { FiDownload } from "react-icons/fi";

interface FilePreviewProps {
  fileName: string;
  fileUrl: string;
  onClose: () => void;
}

const FilePreview: FC<FilePreviewProps> = ({ fileName, fileUrl, onClose }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
      console.error("Failed to download file:", error);
    }
  };

  const renderPreviewContent = (url: string) => {
    if (url.includes("png") || url.includes("jpg") || url.includes("jpeg")) {
      return (
        <div className="relative w-full h-full">
          <Image
            src={url}
            alt={fileName}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
      );
    } else if (url.includes("pdf")) {
      return <iframe src={url} className="w-full h-full border-0" title="PDF Preview"></iframe>;
    } else {
      return (
        <p>File preview not supported for this file type. Please download the file to view it.</p>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 py-8">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 h-full max-h-screen mx-auto flex flex-col transform transition-transform duration-300">
        <div className="flex justify-between items-center pb-2 mb-4 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-medium">{fileName}</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="text-blue-500 hover:text-blue-700 flex items-center space-x-1"
            >
              <FiDownload size={24} />
              <span>Download</span>
            </button>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <IoMdClose className="w-8 h-8" />
            </button>
          </div>
        </div>
        <div className="flex-grow overflow-auto">{renderPreviewContent(fileUrl)}</div>
      </div>
    </div>
  );
};

export default FilePreview;
