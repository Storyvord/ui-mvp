import {
  updateCompanyTask,
  createCompanyTask,
  deleteCompanyTask,
  getCompanyTasks,
  companyTaskCompletionApproval,
  getCompanyEmployeeTasks,
  companyTaskCompletionRequest,
} from "@/lib/api/company/tasks";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetCompanyTasks = () => {
  return useQuery({
    queryKey: ["getCompanyTasks"],
    queryFn: getCompanyTasks,
  });
};

export const useGetCompanyEmployeeTasks = () => {
  return useQuery({
    queryKey: ["getCompanyEmployeeTasks"],
    queryFn: getCompanyEmployeeTasks,
  });
};

export const useCreateNewCompanyTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCompanyTask,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getCompanyTasks"],
      });
      return data;
    },
    onError: (error) => {
      throw error;
    },
  });
};

export const useDeleteCompanyTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCompanyTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCompanyTasks"],
      });
    },
    onError: (error) => {
      throw error;
    },
  });
};

export const useUpdateCompanyTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCompanyTask,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getCompanyTasks"],
      });
      return data;
    },
    onError: (error) => {
      throw error;
    },
  });
};

export const useCompanyTaskCompletionApproval = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: companyTaskCompletionApproval,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getCompanyTasks"],
      });
      return data;
    },
    onError: (error) => {
      throw error;
    },
  });
};

export const useCompanyTaskCompletionRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: companyTaskCompletionRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getCompanyEmployeeTasks"],
      });
      return data;
    },
    onError: (error) => {
      throw error;
    },
  });
};
