import { NEW_API_URL_V2, USER_API } from "@/constant/constant";
import { RoomFormData, UploadFileFormData } from "@/types";
import { customFetch } from "../api";

export const getCompanyFileDocumentRooms = async (companyId: string) => {
  return customFetch(`${NEW_API_URL_V2}/client/folders/${companyId}/`, {
    method: "GET",
  });
};

export const createCompanyFileDocumentRoom = async ({
  roomFormData,
  companyId,
}: {
  roomFormData: RoomFormData;
  companyId: string;
}) => {
  return customFetch(`${NEW_API_URL_V2}/client/folders/${companyId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roomFormData),
  });
};
export const deleteCompanyRoom = async (roomId: number) => {
  return customFetch(`${NEW_API_URL_V2}/client/folders/details/${roomId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateCompanyRoom = async ({
  roomId,
  roomFormData,
}: {
  roomId: string;
  roomFormData: RoomFormData;
}) => {
  return customFetch(`${NEW_API_URL_V2}/client/folders/details/${roomId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roomFormData),
  });
};
export const getAllCompanyFiles = async (roomId: string) => {
  return customFetch(`${NEW_API_URL_V2}/client/folders/${roomId}/files/`, {
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
  return customFetch(`${NEW_API_URL_V2}/client/folders/${roomId}/files/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(uploadedFileData),
  });
};

export const deleteCompanyFile = async (fileId: number) => {
  return customFetch(`${NEW_API_URL_V2}/client/folders/files/${fileId}/`, {
    method: "DELETE",
  });
};
