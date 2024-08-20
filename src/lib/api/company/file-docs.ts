import { USER_API } from "@/constant/constant";
import { RoomFormData, UploadFileFormData } from "@/types";
import Cookies from "js-cookie";

export const getCompanyFileDocumentRooms = async () => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/client/folders/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch company room");
  }
  return res.json();
};

export const createCompanyFileDocumentRoom = async (roomFormData: RoomFormData) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/client/folders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(roomFormData),
  });

  if (!res.ok) {
    throw new Error("Failed to create company Room");
  }

  return res.json();
};

export const getAllCompanyFiles = async (roomId: string) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/client/folders/${roomId}/files/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch files");
  }
  return res.json();
};

export const uploadCompanyFile = async ({
  uploadedFileData,
  roomId,
}: {
  uploadedFileData: UploadFileFormData;
  roomId: string;
}) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/client/folders/${roomId}/files/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(uploadedFileData),
  });

  if (!res.ok) {
    throw new Error("Failed to upload company file");
  }

  return res.json();
};

export const deleteCompanyFile = async (fileId: number) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/client/folders/files/${fileId}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete company files");
  }
};
