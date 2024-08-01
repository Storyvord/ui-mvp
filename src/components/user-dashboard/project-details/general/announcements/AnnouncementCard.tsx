import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import Loader from "@/components/Loader";

type AnnouncementCardProps = {
  title: string;
  message: string;
  isLoading: boolean;
  onDelete: () => void;
};

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ title, message, isLoading, onDelete }) => {
  return (
    <Card className="relative max-h-[40rem]">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <div className="absolute top-4 right-3">
        <Popover>
          <PopoverTrigger>
            <BsThreeDotsVertical />
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            {isLoading ? (
              <Loader />
            ) : (
              <MdDelete
                onClick={onDelete}
                className="cursor-pointer text-red-500"
              />
            )}
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center gap-3 mt-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>SS</AvatarFallback>
        </Avatar>
        <h3 className="font-semibold text-gray-600 text-sm">Souvik</h3>
      </div>
      <CardContent>
        <p className="mt-4 text-gray-500 line-clamp-6">{message}</p>
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;
