import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CiLock } from "react-icons/ci";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ExternalContactDialog from "./ExternalContactDialog";

const CrewHire = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogExternalContact, setOpenDialogExternalContact] = useState(false);
  return (
    <div>
      <nav className="mx-auto flex gap-4 justify-end mr-8">
        <Popover>
          <PopoverTrigger>
            <Button className=" mr-4 font-semibold">Add Crew</Button>
          </PopoverTrigger>
          <PopoverContent>
            <h1
              className=" p-1 pl-2 hover:bg-gray-200 rounded cursor-pointer"
              onClick={() => setOpenDialog(!openDialog)}
            >
              Invite Crew
            </h1>
            <h1 onClick={() => setOpenDialogExternalContact(!openDialogExternalContact)} className=" mt-2 p-1 pl-2 hover:bg-gray-200 rounded cursor-pointer">
              Add external contact
            </h1>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger className=" flex gap-2 p-1 border-none rounded-lg px-2 item-center font-semibold bg-white border text-lg">
            <CiLock className=" w-6 h-6" />
            Access Rights
          </PopoverTrigger>
          <PopoverContent>
            <Input placeholder="enter email" />
          </PopoverContent>
        </Popover>
      </nav>
      <main className="mt-12 flex flex-col gap-8">
        <Accordion type="single" collapsible className="bg-white p-4 rounded-md shadow-md">
          <AccordionItem value="item-1">
            <AccordionTrigger className=" text-xl font-semibold ml-4">
              Production(0)
            </AccordionTrigger>
            <AccordionContent className=" flex justify-center p-8">
              <Button variant="outline" className=" mr-4 font-semibold">
                Add Crew
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="bg-white p-4 rounded-md shadow-md">
          <AccordionItem value="item-1">
            <AccordionTrigger className=" text-xl font-semibold ml-4">Casting(0)</AccordionTrigger>
            <AccordionContent className=" flex justify-center p-8">
              <Button variant="outline" className=" mr-4 font-semibold">
                Add Crew
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>

      <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> Invite </DialogTitle>
            <div className=" flex gap-4 items-center">
              <Input placeholder="enter email" />
              <Button>Invite</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      
      <ExternalContactDialog
        openDialogExternalContact={openDialogExternalContact}
        setOpenDialogExternalContact={setOpenDialogExternalContact}
      />
    </div>
  );
};

export default CrewHire;
