import { USER_API } from "@/constant/constant";
import Cookies from "js-cookie";

export const getCrewFileDocumentRooms = async (project_id: string) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/files/folders/${project_id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch rooms");
  }

  return res.json();
};

export const getAllFiles = async (room_id: string) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/files/folders/details/${room_id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch rooms");
  }

  return res.json();
};
