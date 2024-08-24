import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import Loader from "@/components/Loader";

type Props = {
  isLoading: boolean;
  deleteItem: (id: number) => void;
  setEditableFieldId: (id: number) => void;
  setOpenDialog: (value: boolean) => void;
  id: number;
};

const FieldControl = ({ isLoading, deleteItem, setEditableFieldId, setOpenDialog, id }: Props) => {
  return (
    <div className="absolute top-2 right-2 z-50">
      <Popover>
        <PopoverTrigger>
          <BsThreeDotsVertical className="cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent className="w-fit">
          {isLoading ? (
            <Loader />
          ) : (
            <MdDeleteOutline
              onClick={() => deleteItem(id)}
              className="w-6 h-6 text-red-600 cursor-pointer"
            />
          )}
          <MdOutlineModeEdit
            onClick={() => {
              setEditableFieldId(id);
              setOpenDialog(true);
            }}
            className="w-6 h-6 mt-3 cursor-pointer"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FieldControl;
