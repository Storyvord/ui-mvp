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
  useGetCompanyFileDocumentRooms,
} from "@/lib/react-query/queriesAndMutations/company/file-docs";
import { useGetSendInvitationsList } from "@/lib/react-query/queriesAndMutations/company/employee";

type RoomDataType = {
  id: string;
  name: string;
  description: string;
  icon: string;
  default: boolean;
};

const CompanyFileSection: FC = () => {
  const [showForm, setShowForm] = useState(false);

  const { data: roomData, isLoading: isLoadingFiles } = useGetCompanyFileDocumentRooms();
  const { data: employee_list } = useGetSendInvitationsList();
  const employeeList = employee_list?.accepted.map(
    (employee: { firstName: string; id: number; employee_email: string }) => ({
      value: employee.id,
      label: employee.firstName || employee.employee_email,
    })
  );
  const router = useRouter();

  const handleCardClick = (roomId: string) => {
    router.push(`/dashboard/company-files/${roomId}`);
  };

  const {
    mutateAsync,
    isPending: isLoadingCreateRoom,
    isError: isErrorCreateRoom,
  } = useCreateCompanyFileDocumentRoom();
  const handleCreateRoom = async (data: RoomFormData) => {
    const transformData = { ...data, icon: "IoFolderOpenOutline", allowed_users: data.accessRight };
    const res = await mutateAsync(transformData);
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
      {roomData?.length === 0 && (
        <>
          <h1 className=" text-center text-gray-700 text-xl mt-8">No room found</h1>
          <h3 className="text-center text-gray-600 text-md mt-2">
            Create Room and manage your company files
          </h3>
        </>
      )}
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
        crewList={employeeList}
      />
    </section>
  );
};

export default CompanyFileSection;
