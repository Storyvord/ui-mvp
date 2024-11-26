import React from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateAnnouncement } from "@/lib/react-query/queriesAndMutations/announcements";
import RenderFormFields from "@/components/form-component/RenderFormFields";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { Form } from "@/components/ui/form";
import { FormFieldConfig } from "@/components/form-component/RenderFormFields";

import { announcementFormSchema } from "@/lib/validation";

export type AnnouncementFormType = z.infer<typeof announcementFormSchema>;

const announcementFormFields: FormFieldConfig<AnnouncementFormType>[] = [
  {
    name: "recipients",
    label: "Recipients",
    type: "text",
    placeholder: "Recipients",
  },
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Title",
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
  },
  {
    name: "file",
    label: "Attach Document",
    type: "file",
    optional: true,
  },
];

export const announcementFormDefaultValues = {
  recipients: "",
  title: "",
  message: "",
};
type Props = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
};

const CreateAnnouncementDialog: React.FC<Props> = ({ openDialog, setOpenDialog }) => {
  const params = useParams();
  const projectId = params.id;
  const { mutateAsync, isPending } = useCreateAnnouncement();

  const form = useForm({
    resolver: zodResolver(announcementFormSchema),
    defaultValues: announcementFormDefaultValues,
  });

  const onSubmit = async (data: AnnouncementFormType) => {
    const transformData = {
      title: data.recipients,
      message: data.message,
      project: projectId,
      recipients: [2],
    };

    const res = await mutateAsync(transformData);
    if (res) setOpenDialog(false);
  };

  const isError = false;
  const isLoading = false;
  const isEdit = false;

  return (
    <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
      <DialogContent className=" w-[95%] lg:w-[1200px] p-0">
        <DialogHeader className=" w-full p-4 bg-gray-200 rounded-tr-lg rounded-tl-lg max-h-16">
          <DialogTitle>Announcement details</DialogTitle>
        </DialogHeader>
        <main className=" px-4 pb-4 -mt-4 max-h-[80vh] overflow-y-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" justify-center flex flex-col p-0 lg:px-4 lg:pr-10"
            >
              <section className=" grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border-r border-black/20">
                  <div className=" p-1 lg:p-4 border-b border-black/20">
                    <h3 className=" text-md font-semibold">Select Department</h3>
                    <p className=" text-sm text-gray-500">
                      Please select recipients from crew or mailing lists.
                    </p>
                  </div>
                  <p className=" text-center text-sm text-gray-500 mt-4">No Department found</p>
                </div>

                <div className=" md:col-span-2">
                  <RenderFormFields form={form} formFields={announcementFormFields} />
                </div>
              </section>

              {isError && (
                <p className="text-center text-sm text-red-600 font-semibold">
                  {/* {error?.detail} */}
                  <br />
                </p>
              )}
              <DialogFooter className=" flex justify-end mt-2 gap-4 mb-4">
                <Button type="button" onClick={() => setOpenDialog(false)} variant="ghost">
                  Cancel
                </Button>
                {isEdit ? (
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader /> : "Update"}
                  </Button>
                ) : (
                  <Button type="submit" disabled={isLoading} className="">
                    {isLoading ? <Loader /> : "Save"}
                  </Button>
                )}
              </DialogFooter>
            </form>
          </Form>
        </main>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAnnouncementDialog;
