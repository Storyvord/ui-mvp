"use client";
import CustomForm from "@/components/CustomForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { addressBookFormSchema } from "@/lib/validation/company";
import { FormFieldConfig } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type AddressBookFormType = z.infer<typeof addressBookFormSchema>;

const formFields: FormFieldConfig<AddressBookFormType>[] = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    name: "positions",
    label: "Position",
    type: "text",
    placeholder: "Enter your position",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "secondary_email",
    label: "Secondary Email Address",
    type: "email",
    placeholder: "Enter your secondary email",
  },
  {
    name: "phone_office",
    label: "Office Phone Number",
    type: "number",
    placeholder: "Enter your office phone number",
  },
  {
    name: "phone_work",
    label: "Work Phone Number",
    type: "number",
    placeholder: "Enter your work phone number",
  },
  {
    name: "phone_home",
    label: "Home Phone Number",
    type: "number",
    placeholder: "Enter your home phone number",
  },
  {
    name: "phone_private",
    label: "Private Phone",
    type: "number",
    placeholder: "Enter your private phone number",
  },
];
const defaultValues: AddressBookFormType = {
  name: "",
  positions: "",
  email: "",
  secondary_email: "",
  phone_office: "",
  phone_work: "",
  phone_home: "",
  phone_private: "",
};

type Props = {
  createAddressBook: (data: AddressBookFormType) => void;
  isLoading: boolean;
  isError: boolean;
  openDialog: boolean;
  setOpenDialog: (openDialog: boolean) => void;
};
const AddressBookForm = ({
  createAddressBook,
  isLoading,
  isError,
  openDialog,
  setOpenDialog,
}: Props) => {
  const form = useForm({
    resolver: zodResolver(addressBookFormSchema),
    defaultValues,
  });

  const onSubmit = (data: AddressBookFormType) => createAddressBook(data);

  return (
    <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>External Contact</DialogTitle>
        </DialogHeader>
        <div className=" max-h-[80vh] overflow-y-auto px-2">
          <CustomForm
            form={form}
            formFields={formFields}
            onSubmit={onSubmit}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddressBookForm;
