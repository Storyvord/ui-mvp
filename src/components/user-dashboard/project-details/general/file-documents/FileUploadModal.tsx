"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadFileFormSchema } from "@/lib/validation";
import { FormFieldConfig } from "@/types/crew";
import CustomForm from "@/components/crew/CustomForm";
import { convertToBase64 } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import { useUploadFile } from "@/lib/react-query/queriesAndMutations/file";
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
    placeholder: "",
  },
];

type FileUploadModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const defaultValues: UploadFileFormData = { name: "", file: null };

const FileUploadModal = ({ isOpen, onClose }: FileUploadModalProps) => {
  const { id: projectId, roomId }: { id: string; roomId: string } = useParams();

  const form = useForm({
    resolver: zodResolver(uploadFileFormSchema),
    defaultValues,
  });
  const { mutateAsync, isError, isLoading } = useUploadFile();

  const onSubmit = async (data: UploadFileFormData) => {
    const base64 = await convertToBase64(data.file);
    const transformData = { ...data, file: base64, allowed_users: [], project: projectId };
    const res = await mutateAsync({ uploadedFileData: transformData, roomId });
    if (res) {
      form.reset();
      onClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Room</DialogTitle>
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
