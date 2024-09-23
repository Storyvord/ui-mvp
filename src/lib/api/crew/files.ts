import { USER_API } from "@/constant/constant";
import { customFetch } from "../api";

export const getCrewFileDocumentRooms = async (project_id: string) => {
  return customFetch(`${USER_API}/api/files/folders/${project_id}/`, {
    method: "GET",
  });
};

export const getAllFiles = async (room_id: string) => {
  return customFetch(`${USER_API}/api/files/folders/details/${room_id}/`, {
    method: "GET",
  });
};
