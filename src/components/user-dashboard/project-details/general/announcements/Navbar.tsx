import React from "react";
import CreateButton from "./CreateButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
};

const Navbar = ({ openDialog, setOpenDialog }: Props) => {
  return (
    <section className=" flex justify-between">
      <CreateButton openDialog={openDialog} setOpenDialog={setOpenDialog} />
      <div className=" flex gap-4">
        <Button variant="outline" className="flex gap-3 font-semibold border border-gray-500">
          <Image src="/icons/search.svg" width={16} height={16} alt="download" />
          Search
        </Button>
        <Button variant="outline" className="flex gap-3 font-semibold border border-gray-500">
          <Image src="/icons/sort.svg" width={16} height={16} alt="download" />
          Sort By
        </Button>
      </div>
    </section>
  );
};

export default Navbar;
