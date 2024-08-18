import { createFileDocumentRoom, getAllFileDocumentRooms } from "@/lib/api/file";
import { useMutation, useQuery, useQueryClient } from "react-query";


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

