import { getCrewTasks, requestApprovalForTask } from "@/lib/api/crew/tasks";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useGetCrewTasks = () => {
  return useQuery({
    queryKey: ["getCrewTasks"],
    queryFn: getCrewTasks,
  });
};

export const useRequestApprovalForTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestApprovalForTask,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getCrewTasks"],
      });
      return data;
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
