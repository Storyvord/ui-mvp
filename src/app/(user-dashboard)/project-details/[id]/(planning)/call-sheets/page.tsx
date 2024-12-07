"use client";
import React, { FC } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import callSheetImg from "@/assets/callsheets.png";
import {
  useDeleteCallSheet,
  useGetCallSheets,
} from "@/lib/react-query/queriesAndMutations/callsheet";

import CallSheetCard from "@/components/user-dashboard/project-details/planning/call-sheet/CallSheetCard";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { useToast } from "@/components/ui/use-toast";

const Page: FC = () => {
  const { id: projectId }: { id: string } = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const { data, isPending, isError } = useGetCallSheets(projectId);

  const { mutateAsync: deleteCallSheet, isPending: isLoadingDelete } = useDeleteCallSheet();

  const handleDeleteCallSheet = async (id: number) => {
    try {
      await deleteCallSheet(id);
      toast({ title: "Successfully deleted" });
    } catch (error) {
      toast({ title: "Failed to delete", variant: "destructive" });
    }
  };

  if (isPending)
    return (
      <div className=" w-full h-screen grid place-content-center">
        <Loader />
      </div>
    );
  return (
    <div className="py-4 px-4">
      <div className="p-2 flex flex-col items-start">
        <div className="flex flex-col items-center w-full">
          <div className="text-slate-500 text-lg lg:text-xl text-center mb-1 py-2">
            Generate ready to go, pre-populated call sheets in minutes with breakdown, schedule, and
            department information attached.
          </div>

          <Button
            onClick={() => router.push(`/project-details/${projectId}/call-sheets/create`)}
            className="rounded-md flex items-center space-x-2 mt-2"
            variant="outline"
          >
            Create Call Sheet
          </Button>
          {isError && <p> Failed to get call sheets</p>}
          {data?.length === 0 ? (
            <Image
              src={callSheetImg}
              alt="Call Sheet Example"
              layout="responsive"
              className="mt-5 w-5/6 max-w-[80%] h-auto mx-auto"
            />
          ) : (
            data?.map((item: { id: number; title: string; date: string; calltime: string }) => (
              <CallSheetCard
                key={item.id}
                title={item.title}
                date={item.date}
                time={item.calltime}
                deleteCallSheet={handleDeleteCallSheet}
                isLoadingDelete={isLoadingDelete}
                id={item.id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
