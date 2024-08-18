import { USER_API } from "@/constant/constant";
import { RoomFormData } from "@/types";
import Cookies from "js-cookie";

/**
 * This function retrieves all file document rooms for a specific project using an access token for
 * authorization.
 * @param {string} projectId - The `projectId` parameter in the `getAllFileDocumentRooms` function is a
 * string that represents the unique identifier of a project. This parameter is used to fetch all file
 * document rooms associated with the specified project.
 * @returns The function `getAllFileDocumentRooms` is returning the JSON response from the API call to
 * fetch files and folders for a specific project ID.
 */
export const getAllFileDocumentRooms = async (projectId: string) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/files/folders/${projectId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch files room event");
  }
  return res.json();
};

/**
 * The function `createFileDocumentRoom` sends a POST request to create a new room document in a
 * specified project folder.
 * @param  - The `createFileDocumentRoom` function is an asynchronous function that creates a file
 * document room by sending a POST request to a specified API endpoint. Here are the parameters
 * required for this function:
 * @returns The function `createFileDocumentRoom` is returning the JSON response from the API call
 * after creating a file document room.
 */
export const createFileDocumentRoom = async ({
  roomFormData,
  projectId,
}: {
  roomFormData: RoomFormData;
  projectId: string;
}) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/files/folders/${projectId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(roomFormData),
  });

  if (!res.ok) {
    throw new Error("Failed to create Room");
  }

  return res.json();
};

