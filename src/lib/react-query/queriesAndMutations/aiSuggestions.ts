import { getRequirements, getSuggestions } from "@/lib/api/aiSuggestions";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetSuggestions = (project_id: string) => {
  return useQuery({
    queryKey: ["getSuggestions"],
    queryFn: () => getSuggestions(project_id),
  });
};

export const useGetRequirements = () => {
  return useMutation({
    mutationFn: getRequirements,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      throw error;
    },
  });
};
