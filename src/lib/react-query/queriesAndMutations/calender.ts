import { createCalenderEvent, deleteCalenderEvent, getAllCalenderEvents, getCalenderEvent } from "@/lib/api/calender";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useGetAllCalenderEvents = () => {
  return useQuery({
    queryKey: ["getAllCalenderEvents"],
    queryFn: getAllCalenderEvents,
  });
};

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

export const useGetCalenderEvent = () => {
  return useQuery({
    queryKey: ["getCalenderEvent"],
    queryFn: getCalenderEvent,
  });
};

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
