"use client";
import { FC, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import RoomForm from "@/components/user-dashboard/project-details/general/file-documents/RoomForm";
import RoomCard from "@/components/user-dashboard/project-details/general/file-documents/RoomCard";
import {
  useCreateFileDocumentRoom,
  useGetAllFileDocumentRooms,
} from "@/lib/react-query/queriesAndMutations/file";
import { RoomFormData } from "@/types";

type RoomDataType = {
  id: string;
  name: string;
  description: string;
  icon: string;
  default: boolean;
};

const FileSection: FC = () => {
  const [showForm, setShowForm] = useState(false);

  const { id: projectId }: { id: string } = useParams();
  const { data: roomData, isLoading: isLoadingFiles } = useGetAllFileDocumentRooms(projectId);

  const router = useRouter();

  const handleCardClick = (roomId: string) => {
    router.push(`/project-details/${projectId}/file-documents/${roomId}`);
  };

  const {
    mutateAsync,
    isLoading: isLoadingCreateRoom,
    isError: isErrorCreateRoom,
  } = useCreateFileDocumentRoom();
  const handleCreateRoom = async (data: RoomFormData) => {
    const transformData = { ...data, icon: "IoFolderOpenOutline", allowed_users: [] };
    const res = await mutateAsync({ roomFormData: transformData, projectId });
    if (res.ok) setShowForm(false);
  };

  return (
    <section className="relative py-5 px-4">
      <div className="mb-5 flex flex-col md:flex-row lg:flex-row items-center lg:justify-between md:justify-between mt-5">
        <Button
          variant="outline"
          className="flex items-center mb-4 md:mb-0 lg:mb-0"
          onClick={() => setShowForm(true)}
        >
          <FaPlus className="mr-2" /> Create Room
        </Button>
      </div>
      {isLoadingFiles && <p className=" text-center">Fetching your files...</p>}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-5">
        {roomData?.map((room: RoomDataType, index: number) => (
          <RoomCard key={index} room={room} onClick={handleCardClick} />
        ))}
      </div>
      <RoomForm
        createRoom={handleCreateRoom}
        isLoading={isLoadingCreateRoom}
        isError={isErrorCreateRoom}
        open={showForm}
        onClose={() => setShowForm(false)}
      />
    </section>
  );
};

export default FileSection;
