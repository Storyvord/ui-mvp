"use client";
import { useToast } from "@/components/ui/use-toast";
import CallSheetForm, {
  ShootFormType,
} from "@/components/user-dashboard/project-details/planning/call-sheet/CallSheetForm";
import {
  useEditCallSheet,
  useGetCallSheetDetails,
} from "@/lib/react-query/queriesAndMutations/callsheet";
import { useSearchParams } from "next/navigation";
import React from "react";

const EditCallSheet = () => {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));

  const { data } = useGetCallSheetDetails(id);

  console.log(data);

  const { mutateAsync: editCallSheet, isLoading: isLoading, isError: isError } = useEditCallSheet();

  const handleEditCallSheet = async (formData: ShootFormType) => {
    const res = await editCallSheet({ formData, id });
    console.log(res);
    if (res) {
      toast({ title: "Call Sheet successfully created" });
    }
  };
  return (
    <>
      <CallSheetForm
        submitHandler={handleEditCallSheet}
        isLoading={isLoading}
        isError={isError}
        isEdit={true}
      />
    </>
  );
};

export default EditCallSheet;
