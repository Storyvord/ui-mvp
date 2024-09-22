import {
  createFileDocumentRoom,
  deleteFile,
  getAllFileDocumentRooms,
  getAllFiles,
  updateRoomAccessRights,
  uploadFile,
} from "@/lib/api/file";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * The function `useGetAllFileDocumentRooms` returns a query for getting all file document rooms based
 * on a project ID.
 * @param {string} projectId - The `projectId` parameter is a string that represents the unique
 * identifier of a project. It is used to retrieve all file document rooms associated with the
 * specified project.
 * @returns A custom hook `useGetAllFileDocumentRooms` is being returned, which takes a `projectId` as
 * a parameter and uses the `useQuery` hook to fetch data for all file document rooms associated with
 * the provided `projectId`. The `queryKey` is set to `["getAllFileDocumentRooms"]` and the `queryFn`
 * is a function that calls the `getAllFileDocumentRooms
 */
export const useGetAllFileDocumentRooms = (projectId: string) => {
  return useQuery({
    queryKey: ["getAllFileDocumentRooms"],
    queryFn: () => getAllFileDocumentRooms(projectId),
  });
};

/**
 * The function `useCreateFileDocumentRoom` is a custom hook that uses mutation to create a file
 * document room and invalidates the query cache on success.
 * @returns The `useCreateFileDocumentRoom` custom hook is being returned. This hook uses `useMutation`
 * from React Query to handle the creation of a file document room. It includes logic to invalidate the
 * query cache for "getAllFileDocumentRooms" on successful mutation and logs an error message to the
 * console on failure.
 */
export const useCreateFileDocumentRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFileDocumentRoom,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getAllFileDocumentRooms"],
      });
      return data;
    },
    onError: (error) => {
      console.error("Error submitting create create room form:", error);
    },
  });
};

export const useGetAllFiles = (roomId: string) => {
  return useQuery({
    queryKey: ["getAllFiles", roomId],
    queryFn: () => getAllFiles(roomId),
    // cacheTime: 0,
    // staleTime: 0,
  });
};

/**
 * The useUploadFile function is a custom hook in TypeScript that handles file uploads and invalidates
 * a specific query key upon successful upload.
 * @returns The `useUploadFile` custom hook is being returned. This hook uses `useMutation` from React
 * Query to handle file uploads. It triggers a mutation to upload a file, and upon success, it
 * invalidates the query for fetching all file document rooms. If there is an error during the upload
 * process, it logs an error message to the console.
 */
export const useUploadFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getAllFiles"],
      });
      return data;
    },
    onError: (error) => {
      console.error("Error uploading file:", error);
    },
  });
};

/**
 * The useDeleteFile function is a custom hook in TypeScript that uses useMutation to delete a file and
 * invalidates the "getAllFiles" query key on success.
 * @returns The `useDeleteFile` custom hook is being returned. This hook uses `useMutation` from React
 * Query to handle the deletion of a file. It invalidates the "getAllFiles" query in the `queryClient`
 * on success and logs an error message to the console on failure.
 */
export const useDeleteFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getAllFiles"],
      });
      return data;
    },
    onError: (error) => {
      console.error("Error deleting file:", error);
    },
  });
};

export const useUpdateRoomAccessRights = () => {
  return useMutation({
    mutationFn: updateRoomAccessRights,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.error("Error updating room access rights:", error);
    },
  });
};
