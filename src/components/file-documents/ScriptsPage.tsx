"use client";

import React, { FC, useState, useEffect } from "react";
import { Plus } from "../../app/(user-dashboard)/project-details/[id]/(general)/file-documents/icons/docsIcons";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { FolderOpen, X, Trash2, FileAxis3D } from "lucide-react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const storageKey = "scriptsObjects";

const ScriptsPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [objects, setObjects] = useState<ObjectData[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const [previewFile, setPreviewFile] = useState<{
    file: Blob;
    url: string;
    fileName: string;
  } | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsMd(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const storedObjects = localStorage.getItem(storageKey);
    if (storedObjects) {
      setObjects(JSON.parse(storedObjects));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(objects));
  }, [objects]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
    setSelectedFileName(null);
  };

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

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
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

  const handlePreview = (
    fileData: string,
    fileName: string,
    fileType: string
  ) => {
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

  const renderFilePreview = (object: ObjectData) => {
    const byteString = atob(object.fileData.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: object.fileType });
    const url = URL.createObjectURL(blob);

    if (object.fileType && object.fileType.startsWith("image/")) {
      return (
        <Image
          src={url}
          alt={object.fileName}
          layout="fill"
          objectFit="contain"
          className="rounded-t-lg"
        />
      );
    } else {
      return <FileAxis3D className="text-blue-500 w-20 h-20 stroke-1" />;
    }
  };

  const renderPreviewContent = (file: Blob, fileType: string, url: string) => {
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
      return !window.navigator.pdfViewerEnabled ? (
        <div className="text-center">
          <p className="text-slate-500">
            Your browser does not support PDFs. Please download the PDF to view
            it:
          </p>
          <a href={url} download className="text-blue-500 underline">
            Download PDF
          </a>
        </div>
      ) : (
        <iframe src={url} className="w-full h-full border-0" title=""></iframe>
      );
    } else {
      return (
        <p>
          File preview not supported for this file type. Please download the
          file to view it.
        </p>
      );
    }
  };

  return (
    <section>
      <ToastContainer />
      <div className="flex flex-col md:flex-row lg:flex-row items-center lg:justify-between md:justify-between mt-5">
        <Button
          variant="outline"
          className="flex flex-row"
          onClick={handleOpenModal}
        >
          <Plus />
          <span className="ml-2">Create Object</span>
        </Button>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {objects.map((object, index) => (
          <div
            key={index}
            className="relative w-full h-60 md:h-64 lg:h-64 shadow-md rounded-lg bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <div
              className="h-[80%] flex items-center justify-center"
              onClick={() =>
                handlePreview(object.fileData, object.fileName, object.fileType)
              }
            >
              {renderFilePreview(object)}
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[20%] bg-white flex items-center justify-between p-4 border-t border-gray-200">
              <div
                onClick={() =>
                  handlePreview(
                    object.fileData,
                    object.fileName,
                    object.fileType
                  )
                }
                className="flex-grow"
              >
                <h3 className="text-black font-medium">{object.name}</h3>
                <span className="text-slate-500 text-sm">
                  {object.fileName}
                </span>
              </div>
              <button
                className="text-red-500"
                onClick={() => handleDelete(index)}
              >
                <Trash2 size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {objects.length === 0 && (
        <div className="relative mb-4 border-2 border-solid border-gray-200 rounded flex flex-col items-center justify-center py-10">
          <FolderOpen className="text-blue-500 lg:w-22 lg:h-22 md:w-20 md:h-20 w-10 h-10 mb-4 stroke-1" />
          <label className="block text-sm text-slate-500 mb-2">
            No objects have been added yet.
          </label>
          {errors.file && (
            <span className="text-red-500 text-sm">{errors.file.message}</span>
          )}
          <div className="flex py-3">
            <Button
              variant="outline"
              className="w-26 h-12 flex flex-row"
              onClick={handleOpenModal}
            >
              <Plus />
              <span className="font-semibold ml-2">Create Object</span>
            </Button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96 max-h-full transform transition-transform duration-300">
            <div className="flex justify-center items-center pb-2 mb-4 border-b">
              <h2 className="text-2xl font-medium">Create Object</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  className={`w-full p-3 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4`}
                  type="text"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Choose a file <span className="text-red-500">*</span>
                </label>
                <div className="relative mb-4 border-2 border-dashed border-gray-300 rounded-lg py-10 text-center cursor-pointer hover:bg-gray-100 transition duration-300">
                  <FileAxis3D className="text-blue-500 w-10 h-10 mb-4 mx-auto" />
                  <label className="block text-sm text-slate-500 mb-2">
                    Drag and Upload File or Click to Select
                  </label>
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    {...register("file", { required: "File is required" })}
                    onChange={handleFileChange}
                  />
                  {errors.file && (
                    <span className="text-red-500 text-sm">
                      {errors.file.message}
                    </span>
                  )}
                </div>
                {selectedFileName && (
                  <span className="block text-xs text-slate-500">
                    Selected file: {selectedFileName}
                  </span>
                )}
              </div>
              <footer className="pt-6 flex justify-end space-x-4 mt-4 border-t border-gray-200">
                <Button
                  onClick={handleCloseModal}
                  type="button"
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button type="submit">Create</Button>
              </footer>
            </form>
          </div>
        </div>
      )}

      {previewFile && !isMobile && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 py-8">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 h-full max-h-screen mx-auto flex flex-col transform transition-transform duration-300">
            <div className="flex justify-between items-center pb-2 mb-4 border-b border-gray-200">
              <h2 className="text-lg md:text-xl font-medium">
                {previewFile.fileName}
              </h2>
              <button
                onClick={handleClosePreview}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-grow overflow-auto">
              {renderPreviewContent(
                previewFile.file,
                previewFile.file.type,
                previewFile.url
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ScriptsPage;
