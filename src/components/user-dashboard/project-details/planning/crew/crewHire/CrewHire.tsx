"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ExternalContactDialog from "./ExternalContactDialog";
import CrewHireNavBar from "./CrewHireNavBar";
import { useParams } from "next/navigation";
import Loader from "@/components/Loader";
import {
  useGetOnBoardedCrewList,
  useSentInvitationToCrew,
} from "@/lib/react-query/queriesAndMutations/crew";
import CrewList, { Crew } from "./CrewList";

const CrewHire = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogExternalContact, setOpenDialogExternalContact] = useState(false);
  const [email, setEmail] = useState("");
  const { id: projectId }: { id: string } = useParams();
  const { mutateAsync, isLoading: isLoadingInvitation } = useSentInvitationToCrew();
  const handleSendInvitation = async () => {
    const res = await mutateAsync({ project_id: projectId, crew_email: email });
    if (res) setOpenDialog(false);
  };

  const { data: crewList, isLoading: isLoadingCrewList } = useGetOnBoardedCrewList(projectId);
  const [filterCrewList, setFilterCrewList] = useState<Crew[] | undefined>(crewList);
  const [searchValue, setSearchValue] = useState("");
  
  useEffect(() => {
    if (crewList) {
      const filtered = crewList.filter((item: Crew) =>
        item.email.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilterCrewList(filtered);
    }
  }, [searchValue, crewList]);

  return (
    <div>
      <CrewHireNavBar
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        openDialogExternalContact={openDialogExternalContact}
        setOpenDialogExternalContact={setOpenDialogExternalContact}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <CrewList data={filterCrewList} isLoading={isLoadingCrewList} />
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
              <Button disabled={isLoadingInvitation} onClick={handleSendInvitation}>
                {isLoadingInvitation ? <Loader /> : "Invite"}
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
