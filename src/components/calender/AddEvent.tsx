import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { calenderFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import CustomForm from "../CustomForm";
import { CalenderFormFieldType, FormFieldConfig } from "@/types";

const formFields: FormFieldConfig<CalenderFormFieldType>[] = [
  { name: "title", label: "Title", type: "text", placeholder: "Enter event title" },
  { name: "start", label: "Start", type: "datetime-local" },
  { name: "end", label: "End", type: "datetime-local" },
  {
    name: "participants",
    label: "Participants",
    type: "select",
    isMulti: true,
    options: [{ value: "", label: "" }],
  },
  {
    name: "location",
    label: "Location",
    type: "text",
    placeholder: "Enter event location",
    optional: true,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter event description",
    optional: true,
  },
];

type Props = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  formDefaultValue: CalenderFormFieldType;
  createCalenderEvent: (formData: CalenderFormFieldType) => void;
  isLoading: boolean;
  isError: boolean;
  crewList?: { value: string; label: string }[];
};

const AddEvent = ({
  openDialog,
  setOpenDialog,
  formDefaultValue,
  createCalenderEvent,
  isLoading,
  isError,
  crewList,
}: Props) => {
  useEffect(() => {
    formFields[3].options = crewList;
  }, [crewList]);
  const form = useForm<CalenderFormFieldType>({
    resolver: zodResolver(calenderFormSchema),
    defaultValues: formDefaultValue,
  });
  const onSubmit = (formData: CalenderFormFieldType) => {
    createCalenderEvent(formData);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="p-4 font-sans">
        <DialogTitle className=" text-lg">Add New Event</DialogTitle>
        <DialogDescription>Please fill out the details for your new event.</DialogDescription>
        <div className=" max-h-[80vh] overflow-y-auto px-2">
          <CustomForm
            form={form}
            formFields={formFields}
            onSubmit={onSubmit}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddEvent;
