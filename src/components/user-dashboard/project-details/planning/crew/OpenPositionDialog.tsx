import React from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import OpenPositionForm from "./OpenPositionForm";
import { openPositionFormSchema } from "@/lib/validation";
import { z } from "zod";

export type OpenPositionFormData = z.infer<typeof openPositionFormSchema>;

type Props = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
};

const OpenPositionDialog: React.FC<Props> = ({ openDialog, setOpenDialog }) => {
  const params = useParams();
  const projectId = params.id;

  const form = useForm({
    resolver: zodResolver(openPositionFormSchema),
  });

  const onSubmit = (data: OpenPositionFormData) => {};

  return (
    <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
      <DialogContent className="lg:w-[800px] w-[95%]">
        <DialogHeader>
          <DialogTitle> Create Open Position</DialogTitle>
        </DialogHeader>
        <OpenPositionForm form={form} onSubmit={onSubmit} isLoading={false} />
      </DialogContent>
    </Dialog>
  );
};

export default OpenPositionDialog;
