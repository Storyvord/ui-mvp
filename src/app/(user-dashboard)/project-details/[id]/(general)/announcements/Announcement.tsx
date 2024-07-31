import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  title: string;
  message: string;
};

const Announcement = ({ title, message }: Props) => {
  return (
    <Card className=" max-w-96 relative">
      <CardHeader>
        <CardTitle>Announcement Title</CardTitle>
      </CardHeader>
      <div className=" absolute top-4 right-0">
        <Popover>
          <PopoverTrigger>
            <BsThreeDotsVertical />
          </PopoverTrigger>
          <PopoverContent className=" w-fit">
            <MdDelete className=" cursor-pointer text-red-500" />
          </PopoverContent>
        </Popover>
      </div>
      <div className=" flex items-center gap-3">
        <Avatar className="">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>SS</AvatarFallback>
        </Avatar>
        <h3 className=" font-semibold text-gray-600">Souvik</h3>
      </div>
      <CardContent>
        <p className=" mt-4 text-gray-500">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
          quisquam quam sit veritatis consequuntur enim omnis, odio numquam
          aspernatur voluptate nemo id explicabo in optio iusto quos? Ipsum,
          odio laudantium?{" "}
        </p>
      </CardContent>
    </Card>
  );
};

export default Announcement;
