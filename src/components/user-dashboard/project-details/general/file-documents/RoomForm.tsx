"use client";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CustomForm from "@/components/CustomForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRoomFormSchema } from "@/lib/validation";
import { FormFieldConfig } from "@/types/crew";
import { RoomFormData } from "@/types";

type RoomFormProps = {
  createRoom: (data: RoomFormData) => void;
  isLoading: boolean;
  isError: boolean;
  open: boolean;
  onClose: () => void;
};
const formData: FormFieldConfig<RoomFormData>[] = [
  {
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Enter room name",
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    placeholder: "Enter room description",
  },
];
const RoomForm = ({ createRoom, isLoading, isError, open, onClose }: RoomFormProps) => {
  const form = useForm({
    resolver: zodResolver(createRoomFormSchema),
    defaultValues: { name: "", description: "" },
  });
  const onSubmit = (data: RoomFormData) => {
    createRoom(data);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Room</DialogTitle>
        </DialogHeader>
        <CustomForm
          form={form}
          formFields={formData}
          onSubmit={onSubmit}
          isLoading={isLoading}
          isError={isError}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RoomForm;
