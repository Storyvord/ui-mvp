"use client";
import { useToast } from "@/components/ui/use-toast";
import CallSheetForm, {
  ShootFormType,
} from "@/components/user-dashboard/project-details/planning/call-sheet/CallSheetForm";
import {
  useEditCallSheet,
  useGetCallSheetDetails,
} from "@/lib/react-query/queriesAndMutations/callsheet";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const EditCallSheet = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { id: projectId } = useParams();
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));

  const { data } = useGetCallSheetDetails(id);

  const { mutateAsync: editCallSheet, isLoading: isLoading, isError: isError } = useEditCallSheet();

  const defaultValues = {
    title: data?.title,
    date: data?.date,
    calltime: data?.calltime,
    location: data?.location,
    nearest_hospital_address: data?.nearest_hospital_address,
    nearest_police_station: data?.nearest_police_station,
    nearest_fire_station: data?.nearest_fire_station,

    events: data?.events,
    scenes: data?.scenes,
    characters: data?.characters,
    extras: data?.extras,
    department_instructions: data?.department_instructions,
  };

  const handleEditCallSheet = async (formData: ShootFormType) => {
    try {
      const res = await editCallSheet({ formData, id });
      if (res) {
        toast({ title: "update successfully" });
        router.push(`/project-details/${projectId}/call-sheets`);
      }
    } catch (err) {
      toast({ title: "Failed to update", variant: "destructive" });
    }
  };
  return (
    <>
      <CallSheetForm
        submitHandler={handleEditCallSheet}
        isLoading={isLoading}
        isError={isError}
        isEdit={true}
        defaultValue={defaultValues}
      />
    </>
  );
};

export default EditCallSheet;
