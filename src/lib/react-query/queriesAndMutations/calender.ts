import { createCalenderEvent, deleteCalenderEvent, getAllCalenderEvents } from "@/lib/api/calender";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * The function `useGetAllCalenderEvents` is a custom hook in TypeScript that fetches all calendar
 * events for a specific project using a query key and query function.
 * @param {string} projectId - The `projectId` parameter is a string that represents the unique
 * identifier of a project. It is used as a parameter in the `useGetAllCalenderEvents` function to
 * fetch all calendar events associated with the specified project.
 * @returns A custom hook `useGetAllCalenderEvents` is being returned, which takes a `projectId` as a
 * parameter and uses the `useQuery` hook to fetch all calendar events for the specified project using
 * the `getAllCalenderEvents` function.
 */
export const useGetAllCalenderEvents = (projectId: string) => {
  return useQuery({
    queryKey: ["getAllCalenderEvents", projectId],
    queryFn: () => getAllCalenderEvents(projectId),
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
  });
};
