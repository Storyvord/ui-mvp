"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadFileFormSchema } from "@/lib/validation";
import { FormFieldConfig } from "@/types/crew";
import CustomForm from "@/components/CustomForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UploadFileFormData } from "@/types";

const formData: FormFieldConfig<UploadFileFormData>[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter yor file name",
  },
  {
    name: "file",
    label: "Select File",
    type: "file",
  },
];

type FileUploadModalProps = {
  uploadFile: (data: UploadFileFormData) => void;
  isLoading: boolean;
  isError: boolean;
  isOpen: boolean;
  onClose: () => void;
};

const defaultValues: UploadFileFormData = { name: "", file: null };

const FileUploadModal = ({
  uploadFile,
  isLoading,
  isError,
  isOpen,
  onClose,
}: FileUploadModalProps) => {
  const form = useForm({
    resolver: zodResolver(uploadFileFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: UploadFileFormData) => {
    uploadFile(data);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select File</DialogTitle>
        </DialogHeader>
        <CustomForm
          form={form}
          formFields={formData}
          onSubmit={onSubmit}
          isLoading={isLoading}
          isError={isError}
        />
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadModal;
