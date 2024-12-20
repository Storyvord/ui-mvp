"use client";
import { Card, CardTitle } from "@/components/ui/card";
import { useGetInvitations } from "@/lib/react-query/queriesAndMutations/crew/invitations";
import { useRouter } from "next/navigation";
import React from "react";
import { Project } from "../projects/page";

const FileDocument = () => {
  const { data: listOfProjects } = useGetInvitations();
  const router = useRouter();
  return (
    <div>
      <h1 className=" text-center font-semibold text-xl text-gray-700">FileDocument</h1>
      {listOfProjects?.length === 0 && (
        <p className=" text-center text-gray-600 mt-4">You are not on boarder in any project</p>
      )}
      <section className=" mt-4">
        {listOfProjects?.map((item: Project) => (
          <Card
            onClick={() => router.push(`/crew/file-documents/${item.project}`)}
            key={item.id}
            className=" cursor-pointer mb-4 mx-auto max-w-4xl"
          >
            <CardTitle className="text-xl"> {item.project_name}</CardTitle>
            <p className=" text-sm text-gray-400">
              Created At: {new Date(item.created_at).toLocaleString()}
            </p>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default FileDocument;
