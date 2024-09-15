import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ExternalContactDialog from "./ExternalContactDialog";
import CrewHireNavBar from "./CrewHireNavBar";


const CrewHire = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogExternalContact, setOpenDialogExternalContact] = useState(false);
  return (
    <div>
      <CrewHireNavBar
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        openDialogExternalContact={openDialogExternalContact}
        setOpenDialogExternalContact= {setOpenDialogExternalContact}
      />
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
