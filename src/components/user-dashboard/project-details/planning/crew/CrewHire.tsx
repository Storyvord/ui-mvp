"use client";
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
import { useParams } from "next/navigation";
import { useSentInvitationToCrew } from "@/lib/react-query/queriesAndMutations/invitation";
import Loader from "@/components/Loader";

const CrewHire = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogExternalContact, setOpenDialogExternalContact] = useState(false);
  const [email, setEmail] = useState("");
  const { id }: { id: string } = useParams();
  console.log(id);
  const { mutateAsync, isLoading } = useSentInvitationToCrew();
  const handleSendInvitation = async () => {
    const res = await mutateAsync({ project_id: id, crew_email: email });
    if (res) setOpenDialog(false);
  };
  return (
    <div>
      <CrewHireNavBar
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        openDialogExternalContact={openDialogExternalContact}
        setOpenDialogExternalContact={setOpenDialogExternalContact}
      />
      <main className="mt-12 flex flex-col gap-8">
        <h1 className=" text-2xl text-center text-gray-500">On boarded cew will display here</h1>
      </main>

      <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> Invite </DialogTitle>
            <div className=" flex gap-4 items-center">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter email"
              />
              <Button disabled={isLoading} onClick={handleSendInvitation}>
                {isLoading ? <Loader /> : "Invite"}
              </Button>
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
