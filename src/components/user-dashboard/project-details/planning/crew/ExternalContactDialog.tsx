import React from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ExternalContactAddForm from "./ExternalContactAddForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalContactFormSchema } from "@/lib/validation";
import { z } from "zod";

export type ExternalContactFormData = z.infer<typeof ExternalContactFormSchema>;


type Props = {
  openDialogExternalContact: boolean;
  setOpenDialogExternalContact: (value: boolean) => void;
};

const ExternalContactDialog = ({
  openDialogExternalContact,
  setOpenDialogExternalContact,
}: Props) => {
  const params = useParams();
  const projectId = params.id;

  const form = useForm({
    resolver: zodResolver(ExternalContactFormSchema)
  });

  const onSubmit = (data:ExternalContactFormData) => {
    console.log(data);
  };

  return (
    <Dialog
      open={openDialogExternalContact}
      onOpenChange={() => setOpenDialogExternalContact(!openDialogExternalContact)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>External Contact</DialogTitle>
        </DialogHeader>
        <ExternalContactAddForm form={form} onSubmit={onSubmit} isLoading={false} />
      </DialogContent>
    </Dialog>
  );
};

export default ExternalContactDialog;
