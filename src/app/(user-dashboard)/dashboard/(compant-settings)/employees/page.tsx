"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FiPlus } from "react-icons/fi";
import {
  useAcceptCompanyInvitation,
  useGetReceivedInvitationsList,
  useGetSendInvitationsList,
  useRejectCompanyInvitation,
  useSentInvitationToEmployee,
} from "@/lib/react-query/queriesAndMutations/company/employee";
import EmployeeList from "@/components/user-dashboard/dashboard/company-settings/employees/EmployeeList";
import { useToast } from "@/components/ui/use-toast";
import InvitationList from "@/components/user-dashboard/dashboard/company-settings/employees/InvitationList";
import { FormFieldConfig } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomForm from "@/components/form-component/CustomForm";
import { z } from "zod";

const validationSchema = z.object({
  employee_email: z.string().min(1, "This field may not be blank."), // Ensures the field is not empty
  firstName: z.string().min(1, "This field is required."), // Ensures the field is required and not empty
  lastName: z.string().min(1, "This field is required."), // Ensures the field is required and not empty
  message: z.string().min(1, "This field is required."), // Ensures the field is required and not empty
});

type ValidationSchemaType = z.infer<typeof validationSchema>;

const formFields: FormFieldConfig<ValidationSchemaType>[] = [
  {
    name: "employee_email",
    label: "Employee Email",
    type: "email",
    placeholder: "Enter employee email",
  },
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter employee first name",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter employee last name",
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "message",
  },
];
const defaultValues = {
  employee_email: "",
  firstName: "",
  lastName: "",
  message: "",
};
type Props = {
  inviteEmployee: (value: string) => void;
  isLoadingInvitation: boolean;
};

const EmployeeAndStaff = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();
  const {
    mutateAsync: inviteEmployeeAndStaff,
    isPending: isLoadingInvitation,
    isError: isErrorInvitation,
  } = useSentInvitationToEmployee();
  const { data: getReceivedInvitationsList } = useGetReceivedInvitationsList();
  const { data: getSendInvitationsList } = useGetSendInvitationsList();
  const { mutateAsync: acceptInvitation } = useAcceptCompanyInvitation();
  const { mutateAsync: rejectInvitation } = useRejectCompanyInvitation();

  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  const handleSendInvitation = async (data: ValidationSchemaType) => {
    const res = await inviteEmployeeAndStaff(data);
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
        <EmployeeList data={getSendInvitationsList} />
        {getReceivedInvitationsList?.pending.length !== 0 && (
          <InvitationList
            getInvitationsList={getReceivedInvitationsList?.pending}
            acceptInvitation={handleAcceptInvitation}
            rejectInvitation={handleRejectInvitation}
          />
        )}

        <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
          <DialogContent className="lg:w-[800px] w-[95%]">
            <DialogHeader>
              <DialogTitle> Invite Employee </DialogTitle>
            </DialogHeader>
            <CustomForm
              form={form}
              formFields={formFields}
              onSubmit={handleSendInvitation}
              isLoading={isLoadingInvitation}
              isError={isErrorInvitation}
            />
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default EmployeeAndStaff;
