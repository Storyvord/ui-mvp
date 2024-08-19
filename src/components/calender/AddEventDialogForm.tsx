import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalenderFormFieldType } from "@/types";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Loader from "../Loader";

const formFields = [
  { name: "title", label: "Title", type: "text" },
  { name: "start", label: "Start", type: "datetime-local" },
  { name: "end", label: "End", type: "datetime-local" },
  { name: "location", label: "Location", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
];

type Props = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  form: any;
  onSubmit: (formData: CalenderFormFieldType) => void;
  isLoading: boolean;
  isError: boolean;
};

const AddEventDialogForm = ({
  openDialog,
  setOpenDialog,
  form,
  onSubmit,
  isLoading,
  isError,
}: Props) => {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="p-4 font-sans">
        <DialogTitle className=" text-lg">Add New Event</DialogTitle>
        <DialogDescription>Please fill out the details for your new event.</DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {formFields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel className=" font-semibold text-md">{field.label}</FormLabel>
                    <FormControl>
                      {field.type === "textarea" ? (
                        <Textarea {...formField} id={field.name} />
                      ) : (
                        <Input {...formField} id={field.name} type={field.type} />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {isError && (
              <p className=" text-red-600 mt-2 text-sm text-center">Failed to create event</p>
            )}

            <Button disabled={isLoading} type="submit" className=" mt-4">
              {isLoading ? <Loader /> : "Add Event"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialogForm;
