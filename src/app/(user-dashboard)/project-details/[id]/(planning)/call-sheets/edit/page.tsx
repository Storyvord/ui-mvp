"use client";
import React, { Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import {
  useEditCallSheet,
  useGetCallSheetDetails,
} from "@/lib/react-query/queriesAndMutations/callsheet";

import { useToast } from "@/components/ui/use-toast";
import CallSheetForm, {
  ShootFormType,
} from "@/components/user-dashboard/project-details/planning/call-sheet/CallSheetForm";
import Loader from "@/components/Loader";

const EditCallSheetContent = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { id: projectId } = useParams();
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));

  const { data } = useGetCallSheetDetails(id);
  const { mutateAsync: editCallSheet, isLoading, isError } = useEditCallSheet();

  const defaultValues = {
    title: data?.title,
    date: data?.date,
    calltime: data?.calltime,
    location: data?.location,
    nearest_hospital_address: data?.nearest_hospital_address,
    nearest_police_station: data?.nearest_police_station,
    nearest_fire_station: data?.nearest_fire_station,

    events: data?.events,
    call_time: data?.call_time,

    additional_notes: data?.additional_notes,
    production_notes: data?.production_notes,
  };

  const handleEditCallSheet = async (formData: ShootFormType) => {
    const transformData = { ...formData, project: projectId };
    try {
      const res = await editCallSheet({ formData: transformData, id });
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

const EditCallSheet = () => (
  <Suspense
    fallback={
      <div className=" w-full p-4 mt-8 flex- justify-center">
        <Loader />
      </div>
    }
  >
    <EditCallSheetContent />
  </Suspense>
);

export default EditCallSheet;
