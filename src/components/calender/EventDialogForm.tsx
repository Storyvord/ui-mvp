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
import { CalenderFormFieldConfig, CalenderFormFieldType } from "@/types";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const formFields: CalenderFormFieldConfig[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "start", label: "Start", type: "datetime-local", required: true },
  { name: "end", label: "End", type: "datetime-local", required: true },
  { name: "location", label: "Location", type: "text", required: false },
  { name: "description", label: "Description", type: "textarea", required: false },
];

type Props = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  form: any;
  onSubmit: (formData: CalenderFormFieldType) => void;
};

const EventDialogForm = ({ openDialog, setOpenDialog, form, onSubmit }: Props) => {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="p-4 max-h-[85vh] overflow-auto font-sans">
        <DialogTitle>Add New Event</DialogTitle>
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
                    <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                    <FormControl>
                      {field.type === "textarea" ? (
                        <Textarea {...formField} id={field.name} />
                      ) : (
                        <Input
                          {...formField}
                          id={field.name}
                          type={field.type}
                          required={field.required}
                        />
                      )}
                    </FormControl>
                    <FormMessage>{form.formState.errors[field.name]?.message}</FormMessage>
                  </FormItem>
                )}
              />
            ))}

            <Button type="submit" className="bg-green-500 hover:bg-green-700 font-bold">
              Add Event
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialogForm;
