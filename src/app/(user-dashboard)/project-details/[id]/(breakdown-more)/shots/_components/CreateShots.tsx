import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import RenderFormFields from "@/components/RenderFormFields";
import { Form } from "@/components/ui/form";
import Loader from "@/components/Loader";

import { formFields } from "@/constant/formFields/createShots";

export const shotValidationSchema = z.object({
  shotId: z.string().min(2, "Shot ID is required"),
  subject: z.string().min(2, "Subject is required"),
  visual: z.string().min(2, "Visual is required"),
  audio: z.string().min(1, "Audio is required"),
  imageAndProduction: z
    .union([
      z.string(),
      z.instanceof(ArrayBuffer).refine((buffer) => buffer.byteLength > 0, {
        message: "Document cannot be an empty ArrayBuffer",
      }),
      z.instanceof(File).refine(
        (file) =>
          (file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "application/pdf" ||
            file.type === "application/msword" || // For .doc files
            file.type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // For .docx files
            file.type === "text/plain") && // For .txt files
          file.size > 0, // Ensure the file is not empty
        {
          message:
            "Only .jpg, .png, .pdf, .doc, .docx, or .txt files are accepted and must not be empty",
        }
      ),
    ])
    .optional(),
});

type Props = { openDialog: boolean; setOpenDialog: (openDialog: boolean) => void };
export type ShotsFormType = z.infer<typeof shotValidationSchema>;

const CreateShots = ({ openDialog, setOpenDialog }: Props) => {
  const form = useForm({
    resolver: zodResolver(shotValidationSchema),
    defaultValues: {
      shotId: "",
      subject: "",
      visual: "",
      audio: "",
      //   imageAndProduction: "",
    },
  });

  // this manage when apis will integrate
  const isLoading = false;
  const isError = false;
  const isEdit = false;

  const onSubmit = (data: ShotsFormType) => {
    console.log(data);
    //api call
    form.reset();
  };

  return (
    <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
      <DialogContent className=" lg:w-[1000px] w-[95%] p-0">
        <DialogHeader className=" w-full p-4 bg-gray-200 rounded-tr-lg rounded-tl-lg">
          <DialogTitle>Create Shot</DialogTitle>
        </DialogHeader>
        <section className=" px-4 pb-4 -mt-4 max-h-[80vh] overflow-y-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 justify-center flex flex-col"
            >
              <RenderFormFields form={form} formFields={formFields} />

              {isError && (
                <p className="text-center text-sm text-red-600 font-semibold">
                  {/* {error?.detail} */}
                  <br />
                </p>
              )}
              <section className=" flex justify-end mt-2 gap-4">
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
              </section>
            </form>
          </Form>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default CreateShots;
