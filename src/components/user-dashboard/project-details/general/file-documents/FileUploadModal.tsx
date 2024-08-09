"use client"
import React, { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FileAxis3D } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  name: string;
  file: FileList;
}

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

const FileUploadModal: FC<FileUploadModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileSizeLimit = 10 * 1024 * 1024; // 10 MB
      if (file.size > fileSizeLimit) {
        toast.error("The maximum size for each file is 10 MB.");
        return;
      }
      setSelectedFileName(file.name);
    }
  };

  const handleFormSubmit: SubmitHandler<FormData> = (data) => {
    onSubmit(data);
    reset();
    setSelectedFileName(null);
    onClose();
    console.log(data)
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 max-h-full transform transition-transform duration-300">
        <ToastContainer />
        <div className="flex justify-center items-center pb-2 mb-4 border-b">
          <h2 className="text-2xl font-medium">Upload File</h2>
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full p-3 border ${errors.name ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4`}
              type="text"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Choose a file <span className="text-red-500">*</span>
            </label>
            <div className="relative mb-4 border-2 border-dashed border-gray-300 rounded-lg py-10 text-center cursor-pointer hover:bg-gray-100 transition duration-300">
              <FileAxis3D className="text-blue-500 w-10 h-10 mb-4 mx-auto" />
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                {...register("file", { required: "File is required" })}
                onChange={handleFileChange}
              />
              {errors.file && (
                <span className="text-red-500 text-sm">{errors.file.message}</span>
              )}
            </div>
            {selectedFileName && (
              <span className="block text-xs text-slate-500">
                Selected file: {selectedFileName}
              </span>
            )}
          </div>
          <footer className="pt-6 flex justify-end space-x-4 mt-4 border-t border-gray-200">
            <Button onClick={onClose} type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Upload</Button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default FileUploadModal;
