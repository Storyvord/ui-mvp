import React from "react";
import { z } from "zod";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { scriptValidationSchema } from "@/lib/validation";
import FileUpload from "./FileUpload";

type Props = { openDialog: boolean; setOpenDialog: (openDialog: boolean) => void };
export type ScriptFormType = z.infer<typeof scriptValidationSchema>;

const UploadScripts = ({ openDialog, setOpenDialog }: Props) => {
  const handleFilesChange = (files: File[]) => {
    // alert("Selected files: ");
    // api call
    return;
  };

  return (
    <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
      <DialogContent className="lg:w-[1000px] w-[95%] p-0">
        <DialogHeader className="w-full p-4 bg-gray-200 rounded-tr-lg rounded-tl-lg">
          <DialogTitle>Upload Script</DialogTitle>
        </DialogHeader>
        <section className="sm:p-8 p-4 -mt-4 max-h-[80vh] h-full overflow-y-auto">
          <p className="text-sm md:text-base">
            To import a Script, select a file from the Files and Documents area or upload one
            directly from your device. We support formats such as Final Draft, Celtx, Fountain, and
            Hollywood-formatted PDF files. For further details, visit our help section. Storyvord
            will analyze the file, enabling you to merge existing scenes, sets, and characters with
            new ones when uploading an updated version of the same screenplay.
          </p>
          <FileUpload onFilesChange={handleFilesChange} className=" lg:p-24 mt-8 lg:mt-0" />
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default UploadScripts;
