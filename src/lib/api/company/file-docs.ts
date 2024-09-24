import { USER_API } from "@/constant/constant";
import { RoomFormData, UploadFileFormData } from "@/types";
import { customFetch } from "../api";

export const getCompanyFileDocumentRooms = async () => {
  return customFetch(`${USER_API}/api/client/folders/`, {
    method: "GET",
  });
};

export const createCompanyFileDocumentRoom = async (roomFormData: RoomFormData) => {
  return customFetch(`${USER_API}/api/client/folders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roomFormData),
  });
};

export const getAllCompanyFiles = async (roomId: string) => {
  return customFetch(`${USER_API}/api/client/folders/${roomId}/files/`, {
    method: "GET",
  });
};

export const uploadCompanyFile = async ({
  uploadedFileData,
  roomId,
}: {
  uploadedFileData: UploadFileFormData;
  roomId: string;
}) => {
  return customFetch(`${USER_API}/api/client/folders/${roomId}/files/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(uploadedFileData),
  });
};

export const deleteCompanyFile = async (fileId: number) => {
  return customFetch(`${USER_API}/api/client/folders/files/${fileId}/`, {
    method: "DELETE",
  });
};
