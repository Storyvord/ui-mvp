import {
  createProject,
  deleteProject,
  editProject,
  editProjectStatus,
  getProjectDetails,
  getProjects,
} from "@/lib/api/project";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getProjects"],
      });
      return data;
    },
  });
};

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["getProjects"],
    queryFn: getProjects,
    refetchInterval: false,
  });
};

export const useGetProjectDetails = (project_id: string) => {
  return useQuery({
    queryKey: ["projectDetails", project_id],
    queryFn: ({ queryKey }) => {
      const [_key, project_id] = queryKey;
      return getProjectDetails({ project_id });
    },
    retry: false,
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getProjects"],
      });
    },
  });
};

export const useEditProject = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editProject,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getProjects", projectId],
      });
      return data;
    },
  });
};

export const useEditProjectStatus = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editProjectStatus,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["projectDetails", projectId],
      });
      return data;
    },
  });
};
