import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomForm from "@/components/crew/CustomForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRoomFormSchema } from "@/lib/validation";
import { FormFieldConfig } from "@/types/crew";
import { RoomFormData } from "@/types";
import { useCreateFileDocumentRoom } from "@/lib/react-query/queriesAndMutations/file";
import { useParams } from "next/navigation";

type RoomFormProps = {
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
const RoomForm = ({ open, onClose }: RoomFormProps) => {
  const form = useForm({
    resolver: zodResolver(createRoomFormSchema),
    defaultValues: { name: "", description: "" },
  });
  const { id: projectId }: { id: string } = useParams();

  const { mutateAsync, isLoading, isError } = useCreateFileDocumentRoom();
  const onSubmit = async (data: RoomFormData) => {
    const transformData = { ...data, icon: "IoFolderOpenOutline", allowed_users: [] };
    const res = await mutateAsync({ roomFormData: transformData, projectId });
    if (res.ok) onClose();
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
