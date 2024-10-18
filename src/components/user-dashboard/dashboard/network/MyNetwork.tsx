import { Button } from "@/components/ui/button";
import React from "react";

const MyNetwork = () => {
  return (
    <div className=" p-2">
      <header className=" flex justify-between items-center">
        <span className=" flex gap-2 items-center">
          <img src="/icons/network.svg" alt="" />
          <h1 className=" text-lg">My Network</h1>
        </span>
        <Button className=" flex gap-2">
          <img src="/icons/plus-2.svg" alt="" /> Add
        </Button>
      </header>
    </div>
  );
};

export default MyNetwork;
