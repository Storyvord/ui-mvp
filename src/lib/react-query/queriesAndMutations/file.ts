import { createCalenderEvent, deleteCalenderEvent } from "@/lib/api/calender";
import { getAllFileDocumentRooms } from "@/lib/api/file";
import { useMutation, useQuery, useQueryClient } from "react-query";


export const useGetAllFileDocumentRooms = (projectId: string) => {
  return useQuery({
    queryKey: ["getAllCalenderEvents"],
    queryFn: () => getAllFileDocumentRooms(projectId),
  });
};

/**
 * The function `useCreateCalenderEvents` is a custom hook that uses mutation to create calendar events
 * and invalidates the query cache on success.
 * @returns The `useCreateCalenderEvents` custom hook is being returned. This hook uses `useMutation`
 * from React Query to handle the creation of calendar events. It calls the `createCalenderEvent`
 * function as the mutation function, invalidates the "getAllCalenderEvents" query key in the query
 * client on success, and logs an error message to the console on error.
 */
export const useCreateCalenderEvents = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCalenderEvent,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getAllCalenderEvents"],
      });
      return data;
    },
    onError: (error) => {
      console.error("Error submitting create event form:", error);
    },
  });
};



/**
 * The `useDeleteEvent` function is a custom hook in TypeScript that uses `useMutation` to delete a
 * calendar event and invalidate the query for all calendar events upon success.
 * @returns The `useDeleteEvent` function is returning a custom hook that utilizes `useMutation` from
 * React Query. This custom hook is used for deleting a calendar event. It includes a mutation function
 * `deleteCalenderEvent`, an `onSuccess` callback that invalidates the query cache for the key
 * `["getAllCalenderEvents"]` after a successful deletion, and an `onError` callback that
 */
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCalenderEvent,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getAllCalenderEvents"],
      });
      return data;
    },
    onError: (error) => {
      console.error("Error deleting calender event:", error);
    },
  });
};
