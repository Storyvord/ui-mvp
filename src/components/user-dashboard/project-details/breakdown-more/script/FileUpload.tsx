"use client";
import React, { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type FileUploadProps = {
  onFilesChange: (files: File[]) => void;
  className?: string;
};

const FileUpload: React.FC<FileUploadProps> = ({ onFilesChange, className }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const newFilesArray = Array.from(files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFilesArray]);
      onFilesChange([...selectedFiles, ...newFilesArray]);
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    const updatedFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    setSelectedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  return (
    <div className={cn("flex flex-col justify-center items-center gap-4", className)}>
      <label className="flex flex-col items-center justify-center cursor-pointer rounded-xl bg-gray-200 gap-2 lg:gap-6 p-8 lg:p-12 border">
        <input type="file" className="hidden" multiple onChange={handleFileChange} />
        <Image src="/icons/upload-2.svg" alt="icons" width={20} height={20} />
        Upload File
      </label>
      {selectedFiles.length > 0 && (
        <ul className="mt-4">
          {selectedFiles.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex justify-between items-center text-sm text-gray-700"
            >
              <span>{file.name}</span>
              <button
                onClick={() => handleRemoveFile(index)}
                className="ml-2 text-red-500 hover:text-red-700"
                aria-label="Remove file"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUpload;
