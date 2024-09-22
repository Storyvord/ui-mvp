import {
  completeTask,
  createNewTask,
  deleteTask,
  getTasks,
  taskCompletionApproval,
} from "@/lib/api/tasks";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useGetTasks = (projectId: string) => {
  return useQuery({
    queryKey: ["getTasks", projectId],
    queryFn: ({ queryKey }) => {
      const [_key, projectId] = queryKey;
      return getTasks(projectId);
    },
  });
};

export const useCreateNewTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNewTask,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getTasks"],
      });
      return data;
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getTasks"],
      });
    },
  });
};

export const useCompleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: completeTask,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getTasks"],
      });
      return data;
    },
  });
};

export const useTaskCompletionApproval = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: taskCompletionApproval,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getTasks"],
      });
      return data;
    },
  });
};
