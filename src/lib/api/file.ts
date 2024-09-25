import { USER_API } from "@/constant/constant";
import { RoomFormData, UploadFileFormData } from "@/types";
import { customFetch } from "./api";

export const getAllFileDocumentRooms = async (projectId: string) => {
  return customFetch(`${USER_API}/api/files/folders/${projectId}/`, {
    method: "GET",
  });
};

export const createFileDocumentRoom = async ({
  roomFormData,
  projectId,
}: {
  roomFormData: RoomFormData;
  projectId: string;
}) => {
  return customFetch(`${USER_API}/api/files/folders/${projectId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roomFormData),
  });
};

export const getAllFiles = async (roomId: string) => {
  return customFetch(`${USER_API}/api/files/folders/files/${roomId}/`, {
    method: "GET",
  });
};

export const uploadFile = async ({
  uploadedFileData,
  roomId,
}: {
  uploadedFileData: UploadFileFormData;
  roomId: string;
}) => {
  return customFetch(`${USER_API}/api/files/folders/files/${roomId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(uploadedFileData),
  });
};

export const deleteFile = async (fileId: number) => {
  return customFetch(`${USER_API}/api/files/${fileId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateRoomAccessRights = async ({ roomId, data }: { roomId: string; data: any }) => {
  return customFetch(`${USER_API}/api/files/folders/details/${roomId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
