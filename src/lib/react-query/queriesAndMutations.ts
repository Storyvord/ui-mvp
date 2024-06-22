import {useMutation, useQuery} from 'react-query'
import { createProject, fetchLocation, fetchProjectDetails } from '../api/api';

export const useCreateProject = () => {
    return useMutation({
        mutationFn: createProject,
        onSuccess: (data) => {
          return data
        },
        onError: (error) => {
          console.error("Error submitting form:", error);
        },
    });
}

export const useProjectDetails = (project_id:string) =>{
  return useQuery({
    queryKey: ['projectDetails', project_id],
    queryFn: ({ queryKey }) => {
      const [_key, project_id] = queryKey;
      return fetchProjectDetails({ project_id });
    }
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

