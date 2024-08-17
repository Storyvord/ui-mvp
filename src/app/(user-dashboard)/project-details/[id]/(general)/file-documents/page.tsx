"use client";

import { FC, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import RoomForm from "@/components/user-dashboard/project-details/general/file-documents/RoomForm";
import RoomCard from "@/components/user-dashboard/project-details/general/file-documents/RoomCard";
import { useGetAllFileDocumentRooms } from "@/lib/react-query/queriesAndMutations/file";

type FormData = {
  roomName: string;
  roomDesc: string;
};

type RoomDataType = {
  id: string;
  title: string;
  description: string;
};

const FileSection: FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [createdRooms, setCreatedRooms] = useState<RoomDataType[]>([]);
  const [loading, setLoading] = useState(false);

  const { id: projectId }:{id:string} = useParams();
  const {data} = useGetAllFileDocumentRooms(projectId)
  console.log(data)

  const router = useRouter();

  const handleCardClick = (roomId: string) => {
    router.push(`/project-details/${projectId}/file-documents/${roomId}`);
  };

  return (
    <section className="relative py-5 px-4">
      <div className="mb-5 flex flex-col md:flex-row lg:flex-row items-center lg:justify-between md:justify-between mt-5">
        <Button
          variant="outline"
          className="flex items-center mb-4 md:mb-0 lg:mb-0"
          onClick={() => setShowForm(true)}
        >
          <Plus className="mr-2" /> Create Room
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-5">
        {createdRooms.map((room, index) => (
          <RoomCard key={index} room={room} onClick={handleCardClick} />
        ))}
      </div>
      <RoomForm
        open={showForm}
        onClose={() => setShowForm(false)}
        loading={loading}
      />
    </section>
  );
};

export default FileSection;
