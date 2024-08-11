import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { icons } from "@/app/(user-dashboard)/project-details/[id]/(general)/file-documents/icons/Icons";

type FormData = {
  roomName: string;
  roomDesc: string;
  icon?: React.ElementType;
};

type RoomFormProps = {
  open: boolean;
  onClose: () => void;
  loading: boolean;
};

const RoomForm: FC<RoomFormProps> = ({ open, onClose, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>();

  const [selectedIconIndex, setSelectedIconIndex] = useState<number | null>(
    null
  );

  const handleIconSelect = (index: number, Icon: React.ElementType) => {
    setSelectedIconIndex(index);
    setValue("icon", Icon);
    console.log(Icon)
  };

  const handleClose = () => {
    onClose();
    reset();
    setSelectedIconIndex(null); // Reset icon selection on close
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const roomId = data.roomName;
    const room = {
      id: roomId,
      title: data.roomName,
      description: data.roomDesc,
    };

  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Room</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block mb-2 text-xs">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full p-2 border ${
                errors.roomName ? "border-red-500" : "border-gray-200"
              } rounded mb-4`}
              type="text"
              {...register("roomName", { required: "Name is required" })}
            />
            {errors.roomName && (
              <span className="text-red-500 text-sm">
                {errors.roomName.message}
              </span>
            )}
          </div>
          <div>
            <label className="block mb-2 text-xs">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              className={`w-full p-2 border ${
                errors.roomDesc ? "border-red-500" : "border-gray-200"
              } rounded mb-4`}
              {...register("roomDesc", {
                required: "Description is required",
              })}
            ></textarea>
            {errors.roomDesc && (
              <span className="text-red-500 text-sm">
                {errors.roomDesc.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-medium">Select Icon</label>
            <div className="grid lg:grid-cols-6 md:grid-cols-6 grid-cols-6 lg:gap-2 md:gap-2 gap-2 px-4 py-2 cursor-pointer text-slate-400">
              {icons.map((Icon, index) => (
                <div
                  key={index}
                  onClick={() => handleIconSelect(index, Icon)}
                  className={`p-2 rounded cursor-pointer hover:text-black ${
                    selectedIconIndex === index
                      ? "text-black"
                      : "text-slate-400"
                  }`}
                >
                  <Icon />
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleClose} type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" variant="default">
              {loading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RoomForm;
