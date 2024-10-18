import { Announcements } from "@/types";
import { USER_API } from "@/constant/constant";
import { customFetch } from "./api";

export const getAllAnnouncements = async () => {
  return customFetch(`${USER_API}/api/announcement/announcements/`, {
    method: "GET",
  });
};

export const CreateAnnouncement = async (announcementData: Announcements) => {
  return customFetch(`${USER_API}/api/announcement/announcements/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(announcementData),
  });
};

export const deleteAnnouncement = async (id: number) => {
  return customFetch(`${USER_API}/api/announcement/announcements/${id}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
