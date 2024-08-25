"use client";
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditsFormFields, FormFieldConfig } from "@/types/crew";
import { creditsFormValidationSchema } from "@/lib/validation/crew";
import {
  useCreateCredit,
  useUpdateCredit,
  useGetCredit,
} from "@/lib/react-query/queriesAndMutations/crew/profile";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CustomForm from "@/components/CustomForm";

const creditsFormFields: FormFieldConfig<CreditsFormFields>[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter the title",
  },
  {
    name: "year",
    label: "Year",
    type: "text",
    placeholder: "Enter the year",
  },
  {
    name: "role",
    label: "Role",
    type: "text",
    placeholder: "Enter the role",
  },
  {
    name: "production",
    label: "Production",
    type: "text",
    placeholder: "Enter the production",
  },
  {
    name: "type_of_content",
    label: "Type of content",
    type: "text",
    placeholder: "Enter the type of content",
  },
  {
    name: "tags",
    label: "Tags",
    type: "text",
    placeholder: "Enter the tags",
  },
];

const defaultValues: CreditsFormFields = {
  title: "",
  year: "",
  role: "",
  production: "",
  type_of_content: "",
  tags: "",
};

type Props = {
  setOpenDialog: (openDialog: boolean) => void;
  openDialog: boolean;
  fieldId?: number;
};

const CreditsForm = ({ openDialog, setOpenDialog, fieldId }: Props) => {
  const { toast } = useToast();

  const crewProfileId = JSON.parse(localStorage.getItem("crew-profile-id") || "");
  const { mutateAsync, isLoading, isError } = useCreateCredit();
  const { mutateAsync: updateCredit } = useUpdateCredit();
  const { data } = useGetCredit();

  const editableData = data?.find((item: CreditsFormFields) => item.id === fieldId);

  const form = useForm({
    resolver: zodResolver(creditsFormValidationSchema),
    defaultValues,
  });

  useEffect(() => {
    if (editableData) {
      form.reset({
        title: editableData.title,
        year: editableData.year,
        role: editableData.role,
        production: editableData.production,
        type_of_content: editableData.type_of_content,
        tags: editableData.tags,
      });
    } else {
      form.reset(defaultValues);
    }
  }, [editableData, form, fieldId]);

  const onSubmit = async (data: CreditsFormFields) => {
    if (editableData && fieldId) {
      const res = await updateCredit({ creditData: data, id: fieldId });
      if (res) {
        form.reset();
        toast({
          title: "Your credits details successfully updated",
        });
      }
      setOpenDialog(false);
    } else {
      const res = await mutateAsync({ ...data, crew: crewProfileId });
      if (res) {
        form.reset();
        toast({
          title: "Your credits details successfully submitted",
        });
      }
    }
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Credits Details</DialogTitle>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto px-2">
          <CustomForm
            form={form}
            formFields={creditsFormFields}
            onSubmit={onSubmit}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreditsForm;
