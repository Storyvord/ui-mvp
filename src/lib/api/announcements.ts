import { Announcements } from "@/types";
import { USER_API } from "@/constant/constant";
import Cookies from "js-cookie";

/**
 * This function retrieves all announcements for a user using an access token for authorization.
 * @returns The function `getAllAnnouncements` is returning a Promise that resolves to the JSON data
 * fetched from the specified endpoint `/api/announcement/announcements/`.
 */
export const getAllAnnouncements = async () => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/announcement/announcements/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user announcement");
  }
  return res.json();
};

/**
 * The function `CreateAnnouncement` sends a POST request to create a new announcement using the
 * provided data and returns the response in JSON format.
 * @param announcementData - The `CreateAnnouncement` function is an asynchronous function that sends a
 * POST request to a specific endpoint with the provided `announcementData`. The `announcementData`
 * parameter should be an object containing the information needed to create an announcement. This data
 * will be sent in the request body as a JSON string.
 * @returns The function `CreateAnnouncement` is returning the JSON response from the API after
 * creating an announcement.
 */
export const CreateAnnouncement = async (announcementData: Announcements) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/announcement/announcements/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(announcementData),
  });

  if (!res.ok) {
    throw new Error("Failed to create announcement");
  }

  return res.json();
};

/**
 * The function `deleteAnnouncement` sends a DELETE request to the server to delete an announcement
 * with a specific ID.
 * @param {number} id - The `id` parameter in the `deleteAnnouncement` function is the unique
 * identifier of the announcement that you want to delete. This `id` is used to specify which
 * announcement should be deleted from the server when making the DELETE request to the API endpoint.
 */
export const deleteAnnouncement = async (id: number) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/announcement/announcements/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete announcement");
  }
};
