"use client";
import { useToast } from "@/components/ui/use-toast";
import CallSheetForm, {
  ShootFormType,
} from "@/components/user-dashboard/project-details/planning/call-sheet/CallSheetForm";
import { useCreateCallSheet } from "@/lib/react-query/queriesAndMutations/callsheet";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const CreateCaSheet = () => {
  const { id: projectId }: { id: string } = useParams();
  const { toast } = useToast();
  const router = useRouter();

  const {
    mutateAsync: createCallSheet,
    isLoading: isLoading,
    isError: isError,
    error: error,
  } = useCreateCallSheet();

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
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </div>
  );
};

export default CreateCaSheet;
