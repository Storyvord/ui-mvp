import {useMutation} from 'react-query'
import { createProject } from '../api/api';

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