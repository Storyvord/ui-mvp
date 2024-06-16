import {useMutation} from 'react-query'
import { createProject, fetchLocation } from '../api/api';

export const useCreateProject = () => {
    return useMutation({
        mutationFn: createProject,
        onSuccess: (data) => {
          console.log("Form submitted successfully:", data);
        },
        onError: (error) => {
          console.error("Error submitting form:", error);
        },
    });
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