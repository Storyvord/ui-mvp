import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type FormData = {
  roomName: string;
  roomDesc: string;
};

type RoomFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<FormData>;
  loading: boolean;
};

const RoomForm: FC<RoomFormProps> = ({ open, onClose, onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const handleClose = () => {
    onClose();
    reset();
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
              className={`w-full p-2 border ${errors.roomName ? "border-red-500" : "border-gray-200"
                } rounded mb-4`}
              type="text"
              {...register("roomName", { required: "Name is required" })}
            />
            {errors.roomName && (
              <span className="text-red-500 text-sm">{errors.roomName.message}</span>
            )}
          </div>
          <div>
            <label className="block mb-2 text-xs">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              className={`w-full p-2 border ${errors.roomDesc ? "border-red-500" : "border-gray-200"
                } rounded mb-4`}
              {...register("roomDesc", {
                required: "Description is required",
              })}
            ></textarea>
            {errors.roomDesc && (
              <span className="text-red-500 text-sm">{errors.roomDesc.message}</span>
            )}
          </div>
          <DialogFooter>
            <Button
              onClick={handleClose}
              type="button"
              variant="outline"
            >
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
