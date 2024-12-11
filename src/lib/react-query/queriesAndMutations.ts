import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchLocation,
  fetchProjectComplience,
  fetchProjectCulture,
  fetchProjectLogistics,
  getSuggestedCrew,
  getClientProfile,
  // updateClientProfile,
} from "../api/api";

export const useGetClientProfile = () => {
  return useQuery({
    queryKey: ["getClientProfile"],
    queryFn: getClientProfile,
  });
};

// export const useUpdateClientProfile = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: updateClientProfile,
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({
//         queryKey: ["getClientProfile"],
//       });
//       return data;
//     },
//   });
// };

//----------------------------------------------------
export const useProjectLogistics = (project_id: string) => {
  return useQuery({
    queryKey: ["projectLogistics", project_id],
    queryFn: ({ queryKey }) => {
      const [_key, project_id] = queryKey;
      return fetchProjectLogistics({ project_id });
    },
  });
};

export const useProjectCulture = (project_id: string) => {
  return useQuery({
    queryKey: ["projectCulture", project_id],
    queryFn: ({ queryKey }) => {
      const [_key, project_id] = queryKey;
      return fetchProjectCulture({ project_id });
    },
  });
};

export const useProjectComplience = (project_id: string) => {
  return useQuery({
    queryKey: ["projectComplience", project_id],
    queryFn: ({ queryKey }) => {
      const [_key, project_id] = queryKey;
      return fetchProjectComplience({ project_id });
    },
  });
};

export const useGetSuggestedCrew = (project_id: string) => {
  return useQuery({
    queryKey: ["suggestedCrew"],
    queryFn: () => getSuggestedCrew(project_id),
  });
};
