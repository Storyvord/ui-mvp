import React from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCreateAnnouncement } from "@/lib/react-query/queriesAndMutations/announcements";
import { announcementFormSchema } from "@/lib/validation";
import { announcementFormInputType } from "@/types";
import AnnouncementForm from "./AnnouncementForm";

export const announcementFormDefaultValues = {
  title: "",
  message: "",
  expirationDate: "",
  file: null,
}
type Props = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
};

const CreateAnnouncementDialog: React.FC<Props> = ({ openDialog, setOpenDialog }) => {
  const params = useParams();
  const projectId = params.id;
  const { mutateAsync, isPending } = useCreateAnnouncement();

  const form = useForm<announcementFormInputType>({
    resolver: zodResolver(announcementFormSchema),
    defaultValues: announcementFormDefaultValues,
  });

  const onSubmit = async (data: announcementFormInputType) => {
    const transformData = {
      title: data.title,
      message: data.message,
      project: projectId,
      recipients: [2],
    };

    const res = await mutateAsync(transformData);
    if (res) setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Announcement details</DialogTitle>
        </DialogHeader>
        <AnnouncementForm form={form} onSubmit={onSubmit} isLoading={isPending} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateAnnouncementDialog;
