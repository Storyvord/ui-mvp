import { USER_API } from "@/constant/constant";
import { RoomFormData, UploadFileFormData } from "@/types";
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
    throw new Error("Failed to fetch room");
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

/**
 * The function `getAllFiles` fetches all files in a specific room using an access token for
 * authorization.
 * @param {string} roomId - The `roomId` parameter in the `getAllFiles` function is a string that
 * represents the unique identifier of a room or location where the files are stored. This function
 * fetches all files associated with the specified `roomId`.
 * @returns The function `getAllFiles` is returning a Promise that resolves to the JSON data fetched
 * from the specified endpoint `/api/files/folders/files//`. If the fetch operation
 * is successful, it returns the JSON data. If there is an error during the fetch operation, it throws
 * an error with the message "Failed to fetch files".
 */
export const getAllFiles = async (roomId: string) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/files/folders/files/${roomId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch files");
  }
  return res.json();
};

/**
 * The `uploadFile` function uploads a file to a specific room using a POST request with authorization
 * token.
 * @param  - The `uploadFile` function is designed to upload a file to a specific room in a file
 * storage system. It takes two parameters:
 * @returns The `uploadFile` function is returning the JSON response from the API after uploading the
 * file.
 */
export const uploadFile = async ({
  uploadedFileData,
  roomId,
}: {
  uploadedFileData: UploadFileFormData;
  roomId: string;
}) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/files/folders/files/${roomId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(uploadedFileData),
  });

  if (!res.ok) {
    throw new Error("Failed to upload file");
  }

  return res.json();
};

/**
 * The function `deleteFile` deletes a file by sending a DELETE request to the specified API endpoint
 * with the necessary authorization token.
 * @param {number} fileId - The `fileId` parameter in the `deleteFile` function is the unique
 * identifier of the file that you want to delete. It is used to specify which file should be deleted
 * when making a DELETE request to the server.
 */
export const deleteFile = async (fileId: number) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/files/${fileId}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete files");
  }
};
