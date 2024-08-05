import React from "react";
import { useForm } from "react-hook-form";
import { CalenderFormFieldType } from "@/types";
import { calenderFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useCreateCalenderEvents } from "@/lib/react-query/queriesAndMutations/calender";
import EventDialogForm from "./EventDialogForm";


type Props = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  formDefaultValue: CalenderFormFieldType
};

const AddEvent: React.FC<Props> = ({ openDialog, setOpenDialog, formDefaultValue }) => {
  const form = useForm<CalenderFormFieldType>({
    resolver: zodResolver(calenderFormSchema),
    defaultValues:formDefaultValue,
  });

  const { id: projectId }: { id: string } = useParams();

  const { mutateAsync } = useCreateCalenderEvents();

  const onSubmit = (formData: CalenderFormFieldType) => {
    const transformData = {
      ...formData,
      participants: [],
    };
    console.log(transformData);
    mutateAsync({ eventData: transformData, projectId });
  };

  return <EventDialogForm openDialog={openDialog} setOpenDialog={setOpenDialog} form={form} onSubmit={onSubmit} />;
};

export default AddEvent;
