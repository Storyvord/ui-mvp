"use client";
import { FC, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import RoomForm from "@/components/user-dashboard/project-details/general/file-documents/RoomForm";
import RoomCard from "@/components/user-dashboard/project-details/general/file-documents/RoomCard";
import { RoomFormData } from "@/types";
import {
  useCreateCompanyFileDocumentRoom,
  useDeleteCompanyRoom,
  useGetCompanyFileDocumentRooms,
  useUpdateCompanyRoom,
} from "@/lib/react-query/queriesAndMutations/company/file-docs";
import {
  useGetOnBoardedEmployeeList,
  useGetSendInvitationsList,
} from "@/lib/react-query/queriesAndMutations/company/employee";
import { useGetCompanySettings } from "@/lib/react-query/queriesAndMutations/company/settings";
import { useToast } from "@/components/ui/use-toast";

type RoomDataType = {
  id: string;
  name: string;
  description: string;
  icon: string;
  default: boolean;
};

const CompanyFileSection: FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedRoom, setSelectedRoom] = useState<RoomFormData | null>(null);

  const { toast } = useToast();

  const { data: companyProfile } = useGetCompanySettings();
  const { data: employeeListData } = useGetOnBoardedEmployeeList(companyProfile?.data?.id);
  const { data: roomData, isLoading: isLoadingFiles } = useGetCompanyFileDocumentRooms(
    companyProfile?.data?.id
  );

  const employeeList = employeeListData?.data.map((crew: { id: string; user_email: string }) => ({
    value: crew.id,
    label: crew.user_email,
  }));
  const router = useRouter();

  const handleCardClick = (roomId: string) => {
    router.push(`/dashboard/company-files/${roomId}`);
  };

  const {
    mutateAsync,
    isPending: isLoadingCreateRoom,
    isError: isErrorCreateRoom,
  } = useCreateCompanyFileDocumentRoom();

  const {
    mutateAsync: deleteRoom,
    isPending: isPendingDelete,
    isError: isErrorDelete,
  } = useDeleteCompanyRoom();
  const {
    mutateAsync: updateRoom,
    isPending: isLoadingUpdateRoom,
    isError: isErrorUpdateRoom,
  } = useUpdateCompanyRoom();

  const handleCloseRoomForm = () => {
    setShowForm(false);
    setSelectedRoom(null);
    setFormMode("create");
  };

  const handleFormSubmit = async (data: RoomFormData) => {
    const transformData = { ...data, icon: "IoFolderOpenOutline", allowed_users: data.accessRight };

    try {
      if (formMode === "create") {
        await mutateAsync({ roomFormData: transformData, companyId: companyProfile?.data?.id });
      } else if (selectedRoom?.id) {
        await updateRoom({ roomId: selectedRoom.id.toString(), roomFormData: transformData });
      }
      setShowForm(false);
      setSelectedRoom(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create Folder",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRoom = async (roomId: number) => {
    if (confirm("Are you sure you want to delete this room?") === false) return;
    const res = await deleteRoom(roomId);
    if (res.ok) setShowForm(false);
  };

  const handleEditRoom = (room: any) => {
    setSelectedRoom({
      id: room.id,
      name: room.name,
      description: room.description,
      accessRight: room.allowed_users || [],
    });
    setFormMode("edit");
    setShowForm(true);
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
      {roomData?.data?.length === 0 && (
        <>
          <h1 className=" text-center text-gray-700 text-xl mt-8">No room found</h1>
          <h3 className="text-center text-gray-600 text-md mt-2">
            Create Room and manage your company files
          </h3>
        </>
      )}
      {isLoadingFiles && <p className=" text-center">Fetching your files...</p>}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-5">
        {roomData?.data?.map((room: RoomDataType, index: number) => (
          <RoomCard
            key={index}
            room={room}
            onClick={handleCardClick}
            handleDeleteRoom={handleDeleteRoom}
            handleEditRoom={handleEditRoom}
            isPendingDelete={isPendingDelete}
          />
        ))}
      </div>
      <RoomForm
        onSubmit={handleFormSubmit}
        isLoading={formMode === "create" ? isLoadingCreateRoom : isLoadingUpdateRoom}
        isError={formMode === "create" ? isErrorCreateRoom : isErrorUpdateRoom}
        open={showForm}
        onClose={handleCloseRoomForm}
        crewList={employeeList}
        mode={formMode}
        initialData={selectedRoom}
      />
    </section>
  );
};

export default CompanyFileSection;
