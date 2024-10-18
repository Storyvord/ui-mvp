"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";

import { useCreateCallSheet } from "@/lib/react-query/queriesAndMutations/callsheet";

import { useToast } from "@/components/ui/use-toast";
import CallSheetForm, {
  ShootFormType,
} from "@/components/user-dashboard/project-details/planning/call-sheet/CallSheetForm";

const CreateCaSheet = () => {
  const { id: projectId }: { id: string } = useParams();
  const { toast } = useToast();
  const router = useRouter();

  const { mutateAsync: createCallSheet, isPending, isError, error } = useCreateCallSheet();

  // const { data: crew_list } = useGetCrewList(projectId);
  // const crewList = crew_list?.accepted.map(
  //   (crew: { invited_user: { id: number }; firstName: string }) => ({
  //     value: crew.invited_user?.id,
  //     label: crew.firstName,
  //   })
  // );

  const handleCreateCallSheet = async (formData: ShootFormType) => {
    try {
      const res = await createCallSheet({ formData, projectId });
      if (res) {
        toast({ title: "Call Sheet successfully created" });
        router.push(`/project-details/${projectId}/call-sheets/`);
      }
    } catch (err) {
      toast({ title: "Failed to create", variant: "destructive" });
    }
  };
  return (
    <div>
      <CallSheetForm
        submitHandler={handleCreateCallSheet}
        isLoading={isPending}
        isError={isError}
        error={error}
      />
    </div>
  );
};

export default CreateCaSheet;
