"use client";

import { FC, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import FileManagement from "@/components/user-dashboard/project-details/general/file-documents/FileManagement";
import RoomForm from "@/components/user-dashboard/project-details/general/file-documents/RoomForm";
import RoomCard from "@/components/user-dashboard/project-details/general/file-documents/RoomCard";

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
  const [isHome, setIsHome] = useState(true);
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [createdRooms, setCreatedRooms] = useState<RoomDataType[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { id: projectId } = useParams();

  useEffect(() => {
    const storedRooms = localStorage.getItem("createdRooms");
    if (storedRooms) {
      setCreatedRooms(JSON.parse(storedRooms));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("createdRooms", JSON.stringify(createdRooms));
  }, [createdRooms]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setLoading(true);
    setTimeout(() => {
      const roomId = data.roomName;
      const room: RoomDataType = {
        id: roomId,
        title: data.roomName,
        description: data.roomDesc,
      };
      setCreatedRooms([...createdRooms, room]);
      setLoading(false);
      setShowForm(false);
    }, 1000);
  };

  const handleCardClick = (roomId: string) => {
    // setIsHome(false);
    // setCurrentRoomId(roomId);
    router.push(`/project-details/${projectId}/file-documents/${roomId}`);
  };

  const handleBackToHome = () => {
    setIsHome(true);
    setCurrentRoomId(null);
    router.push(`/project-details/${projectId}/file-documents`);
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

      {isHome ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-5">
          {createdRooms.map((room, index) => (
            <RoomCard
              key={index}
              room={room}
              onClick={handleCardClick}
            />
          ))}
        </div>
      ) : (
        <div className="p-4">
          <button onClick={handleBackToHome} className="mb-4 text-blue-500">
            Back to File Management
          </button>
          {currentRoomId && <FileManagement roomId={currentRoomId} />}
        </div>
      )}

      <RoomForm
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={onSubmit}
        loading={loading}
      />
    </section>
  );
};

export default FileSection;
