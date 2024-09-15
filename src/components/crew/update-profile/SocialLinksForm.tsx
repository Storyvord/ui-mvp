"use client";
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SocialLinkFormType, FormFieldConfig } from "@/types/crew";
import { socialLinksFormValidationSchema } from "@/lib/validation/crew";
import {
  useCreateSocialLink,
  useUpdateSocialLink,
  useGetSocialLink,
} from "@/lib/react-query/queriesAndMutations/crew/profile";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CustomForm from "@/components/CustomForm";

const socialLinksFormFields: FormFieldConfig<SocialLinkFormType>[] = [
  {
    name: "link",
    label: "Link",
    type: "text",
    placeholder: "Enter your social link",
  },
];

const defaultValues: SocialLinkFormType = {
  link: "",
};

type Props = {
  setOpenDialog: (openDialog: boolean) => void;
  openDialog: boolean;
  fieldId?: number;
};

const SocialLinksForm = ({ openDialog, setOpenDialog, fieldId }: Props) => {
  const { toast } = useToast();

  const crewProfileId = JSON.parse(localStorage.getItem("crew-profile-id") || "");
  const { mutateAsync, isLoading, isError } = useCreateSocialLink();
  const { mutateAsync: updateSocialLink } = useUpdateSocialLink();
  const { data } = useGetSocialLink();

  const editableData = data?.find((item: SocialLinkFormType) => item.id === fieldId);

  const form = useForm({
    resolver: zodResolver(socialLinksFormValidationSchema),
    defaultValues,
  });

  useEffect(() => {
    if (editableData) {
      form.reset({
        link: editableData.link,
      });
    } else {
      form.reset(defaultValues);
    }
  }, [editableData, form, fieldId]);

  const onSubmit = async (data: SocialLinkFormType) => {
    if (editableData && fieldId) {
      const res = await updateSocialLink({ socialLinkData: data, id: fieldId });
      if (res) {
        form.reset();
        toast({
          title: "Your social link successfully updated",
        });
      }
      setOpenDialog(false);
    } else {
      const res = await mutateAsync({ ...data, crew: crewProfileId });
      if (res) {
        form.reset();
        toast({
          title: "Your social link successfully submitted",
        });
      }
    }
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Social Links</DialogTitle>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto px-2">
          <CustomForm
            form={form}
            formFields={socialLinksFormFields}
            onSubmit={onSubmit}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialLinksForm;
