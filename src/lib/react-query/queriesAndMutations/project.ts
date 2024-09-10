import {
  createProject,
  deleteProject,
  editProject,
  getProjectDetails,
  getProjects,
} from "@/lib/api/project";
import { useMutation, useQuery, useQueryClient } from "react-query";

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
    onError: (error) => {
      console.error("Error submitting form:", error);
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
    onError: (error) => {
      console.error("Error in deleting project:", error);
    },
  });
};

export const useEditProject = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editProject,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["projectDetails", projectId]);
      return data;
    },
    onError: (error) => {
      console.error("Error in completing project:", error);
    },
  });
};
