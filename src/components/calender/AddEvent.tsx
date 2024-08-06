import React from "react";
import { useForm } from "react-hook-form";
import { calenderFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useCreateCalenderEvents } from "@/lib/react-query/queriesAndMutations/calender";
import { z } from "zod";
import AddEventDialogForm from "./AddEventDialogForm";

type Props = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  formDefaultValue: CalenderFormFieldType;
};
export type CalenderFormFieldType = z.infer<typeof calenderFormSchema>;

const AddEvent: React.FC<Props> = ({ openDialog, setOpenDialog, formDefaultValue }) => {
  const form = useForm<CalenderFormFieldType>({
    resolver: zodResolver(calenderFormSchema),
    defaultValues: formDefaultValue,
  });

  const { id: projectId }: { id: string } = useParams();

  const { mutateAsync, isLoading, isError } = useCreateCalenderEvents();

  const onSubmit = async (formData: CalenderFormFieldType) => {
    const transformData = {
      ...formData,
      participants: [],
    };

    try {
      const res = await mutateAsync({ eventData: transformData, projectId });
      if (res) setOpenDialog(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AddEventDialogForm
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default AddEvent;
