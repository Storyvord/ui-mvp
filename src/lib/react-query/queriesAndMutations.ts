import {useMutation, useQuery, useQueryClient} from 'react-query'
import { completeProject, createProject, deleteProject, fetchLocation, fetchProjectCulture, fetchProjectDetails, fetchProjectLogistics } from '../api/api';

export const useCreateProject = () => {
    return useMutation({
        mutationFn: createProject,
        onSuccess: (data) => {
          console.log(data)
          return data
        },
        onError: (error) => {
          console.error("Error submitting form:", error);
        },
    });
}

export const useDeleteProject = () => {
    return useMutation({
        mutationFn: deleteProject,
        onSuccess: (data) => {
          console.log("Deleted project:", data);
        },
        onError: (error) => {
          console.error("Error in deleting project:", error);
        },
    });
}

export const useCompleteProject = (projectId: string) =>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: completeProject,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(['projectDetails', projectId]);
    },
    onError: (error) => {
      console.error("Error in completing project:", error);
    },
  });
}

export const useProjectDetails = (project_id:string) =>{
  return useQuery({
    queryKey: ['projectDetails', project_id],
    queryFn: ({ queryKey }) => {
      const [_key, project_id] = queryKey;
      return fetchProjectDetails({ project_id });
    }, 
    retry: false,
  })
}

export const useLocationList = () => {
  return useMutation(
    (params: { search: string, page: number }) => fetchLocation(params),
    {
      onError: (error) => {
        console.error("Error in fetching location:", error);
    },
});
}

export const useProjectLogistics = (project_id:string) => {
  return useQuery(
    {queryKey: ['projectLogistics', project_id],
    queryFn: ({ queryKey }) => {
      const [_key, project_id] = queryKey;
      return fetchProjectLogistics({ project_id });
    }, 
    }
  )
}

export const useProjectCulture = (project_id:string) => {
  return useQuery(
    {queryKey: ['projectCulture', project_id],
    queryFn: ({ queryKey }) => {
      const [_key, project_id] = queryKey;
      return fetchProjectCulture({ project_id });
    }, 
    }
  )
}

