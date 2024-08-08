"use client"
import React, { FC, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import FileUploadModal from "./FileUploadModal";
import FilePreview from "./FilePreview";
import FileCard from "./FileCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FolderOpen } from "lucide-react";

interface FormData {
  name: string;
  file: FileList;
}

interface ObjectData {
  name: string;
  fileName: string;
  fileType: string;
  fileData: string;
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const FileManagement = ({roomId}:{roomId: string}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [objects, setObjects] = useState<ObjectData[]>([]);
  const [previewFile, setPreviewFile] = useState<{
    file: Blob;
    url: string;
    fileName: string;
  } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  console.log(roomId)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFileSubmit = async (data: FormData) => {
    if (data.file && data.file.length > 0) {
      const file = data.file[0];
      const fileData = await fileToBase64(file);
      const newObject: ObjectData = {
        name: data.name,
        fileName: file.name,
        fileType: file.type,
        fileData: fileData,
      };
      setObjects((prevObjects) => [...prevObjects, newObject]);
      handleCloseModal();
    }
  };

  const handlePreview = (fileData: string, fileName: string, fileType: string) => {
    const byteString = atob(fileData.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: fileType });
    const url = URL.createObjectURL(blob);
    setPreviewFile({ file: blob, url, fileName });
  };

  const handleClosePreview = () => {
    if (previewFile) {
      URL.revokeObjectURL(previewFile.url);
    }
    setPreviewFile(null);
  };

  const handleDelete = (index: number) => {
    setObjects((prevObjects) => prevObjects.filter((_, i) => i !== index));
  };

  return (
    <section>
      <ToastContainer />
      <div className="flex flex-col md:flex-row lg:flex-row items-center lg:justify-between md:justify-between mt-5">
        <Button variant="outline" className="flex flex-row" onClick={handleOpenModal}>
          +
          <span className="ml-2">Upload File</span>
        </Button>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {objects.map((object, index) => (
          <FileCard
            key={index}
            name={object.name}
            fileName={object.fileName}
            fileType={object.fileType}
            fileData={object.fileData}
            onPreview={() => handlePreview(object.fileData, object.fileName, object.fileType)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>

      {objects.length === 0 && (
        <div className="relative mb-4 border-2 border-solid border-gray-200 rounded flex flex-col items-center justify-center py-10">
          <FolderOpen className="text-blue-500 lg:w-22 lg:h-22 md:w-20 md:h-20 w-10 h-10 mb-4 stroke-1" />
          <label className="block text-sm text-slate-500 mb-2">
            No files have been uploaded yet.
          </label>
          <div className="flex py-3">
            <Button variant="outline" className="w-26 h-12 flex flex-row" onClick={handleOpenModal}>
              +
              <span className="font-semibold ml-2">Upload File</span>
            </Button>
          </div>
        </div>
      )}

      <FileUploadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFileSubmit}
      />

      {previewFile && !isMobile && (
        <FilePreview
          fileName={previewFile.fileName}
          fileType={previewFile.file.type}
          fileUrl={previewFile.url}
          onClose={handleClosePreview}
        />
      )}
    </section>
  );
};

export default FileManagement;
