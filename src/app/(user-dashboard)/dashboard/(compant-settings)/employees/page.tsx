"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FiPlus } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import {
  useAcceptCompanyInvitation,
  useGetCompanyInvitations,
  useGetOnBoardedEmployeeList,
  useRejectCompanyInvitation,
  useSentInvitationToEmployee,
} from "@/lib/react-query/queriesAndMutations/company/employee";
import EmployeeList from "@/components/user-dashboard/dashboard/company-settings/employees/EmployeeList";
import Loader from "@/components/Loader";
import { useToast } from "@/components/ui/use-toast";
import InvitationList from "@/components/user-dashboard/dashboard/company-settings/employees/InvitationList";

type Props = {
  inviteEmployee: (value: string) => void;
  isLoadingInvitation: boolean;
};

const EmployeeAndStaff = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const { mutateAsync: inviteEmployeeAndStaff, isLoading: isLoadingInvitation } =
    useSentInvitationToEmployee();
  const { data: invitationAcceptList } = useGetOnBoardedEmployeeList();
  const { data: getInvitationsList } = useGetCompanyInvitations();
  const { mutateAsync: acceptInvitation } = useAcceptCompanyInvitation();
  const { mutateAsync: rejectInvitation } = useRejectCompanyInvitation();

  const handleSendInvitation = async () => {
    const res = await inviteEmployeeAndStaff(email);
    if (res) {
      toast({
        title: "Invitation send to Employee",
      });
    } else {
      toast({
        title: "Failed to send Invitation",
        variant: "destructive",
      });
    }
  };

  const handleAcceptInvitation = async (referralCode: string) => {
    const res = await acceptInvitation(referralCode);
    if (res) {
      toast({
        title: "Invitation Accepted",
      });
    } else {
      toast({
        title: "Failed to Accept Invitation",
        variant: "destructive",
      });
    }
  };
  const handleRejectInvitation = async (referralCode: string) => {
    const res = await rejectInvitation(referralCode);
    if (res) {
      toast({
        title: "Invitation Rejected",
      });
    } else {
      toast({
        title: "Failed to Reject Invitation",
        variant: "destructive",
      });
    }
  };
  return (
    <section className="mt-2 p-4">
      <h1 className="text-gray-700 md:text-xl text-lg font-medium">Employee & Staff</h1>
      <div className="mt-4">
        <Button
          onClick={() => setOpenDialog(true)}
          type="button"
          variant="outline"
          className="md:w-auto w-full flex items-center gap-2 hover:bg-gray-50 "
        >
          <FiPlus size={19} />
          Add Employee & Staff
        </Button>
        <EmployeeList data={invitationAcceptList} />
        <InvitationList
          getInvitationsList={getInvitationsList}
          acceptInvitation={handleAcceptInvitation}
          rejectInvitation={handleRejectInvitation}
        />

        <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-left"> Invite </DialogTitle>
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
      </div>
    </section>
  );
};

export default EmployeeAndStaff;
