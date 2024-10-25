import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import RenderFormFields from "@/components/RenderFormFields";
import { Form } from "@/components/ui/form";
import Loader from "@/components/Loader";

import { scriptValidationSchema } from "@/lib/validation";
import { formFields } from "@/constant/formFields/createScript";

type Props = { openDialog: boolean; setOpenDialog: (openDialog: boolean) => void };
export type ScriptFormType = z.infer<typeof scriptValidationSchema>;

const CreateScripts = ({ openDialog, setOpenDialog }: Props) => {
  const form = useForm({
    resolver: zodResolver(scriptValidationSchema),
    defaultValues: {
      title: "",
      set: "",
      environment: "",
      scriptDay: "",
      point: "",
      description: "",
    },
  });

  // this manage when apis will integrate
  const isLoading = false;
  const isError = false;
  const isEdit = false;

  const onSubmit = (data: ScriptFormType) => {
    alert("Form submitted...");
    //api call
    form.reset();
  };

  return (
    <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
      <DialogContent className=" lg:w-[1000px] w-[95%] p-0">
        <DialogHeader className=" w-full p-4 bg-gray-200 rounded-tr-lg rounded-tl-lg">
          <DialogTitle>Create Script</DialogTitle>
        </DialogHeader>
        <section className=" px-4 pb-4 -mt-4 max-h-[80vh] overflow-y-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 justify-center flex flex-col"
            >
              <RenderFormFields form={form} formFields={formFields.slice(0, 1)} />
              <section className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                <RenderFormFields form={form} formFields={formFields.slice(1, 5)} />
              </section>
              <RenderFormFields form={form} formFields={formFields.slice(5, 7)} />

              {isError && (
                <p className="text-center text-sm text-red-600 font-semibold">
                  {/* {error?.detail} */}
                  <br />
                </p>
              )}
              <section className=" flex justify-end mt-2 gap-4">
                <Button onClick={() => setOpenDialog(false)} variant="ghost">
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

export default CreateScripts;
