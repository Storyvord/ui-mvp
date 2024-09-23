import { getCrewTasks, requestApprovalForTask } from "@/lib/api/crew/tasks";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
  });
};
