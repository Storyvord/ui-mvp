import React from "react";
import Image from "next/image";
import ButtonGroup from "./ButtonGroup";
import { Button } from "@/components/ui/button";

type Props = {
  setCreateScenesDialog: (value: boolean) => void;
  setUploadScenesDialog: (value: boolean) => void;
};
const Navbar = ({ setCreateScenesDialog, setUploadScenesDialog }: Props) => {
  return (
    <header className=" flex justify-between mt-4 ">
      <ButtonGroup
        setCreateScenesDialog={setCreateScenesDialog}
        setUploadScenesDialog={setUploadScenesDialog}
      />
      <div className=" flex gap-4">
        <Button variant="outline" className="flex gap-3 font-semibold border border-gray-500">
          <Image src="/icons/search.svg" width={16} height={16} alt="download" />
          Search
        </Button>
        <Button variant="outline" className="flex gap-3 font-semibold border border-gray-500">
          <Image src="/icons/sort.svg" width={16} height={16} alt="download" />
          Sort By
        </Button>
        <Button variant="outline" className=" flex gap-3 font-semibold border border-gray-500">
          <Image src="/icons/download.svg" width={16} height={16} alt="download" />
          Export
        </Button>
        <Button variant="outline" className=" flex gap-3 font-semibold border border-gray-500">
          <Image src="/icons/settings.svg" width={16} height={16} alt="download" />
          Settings
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
