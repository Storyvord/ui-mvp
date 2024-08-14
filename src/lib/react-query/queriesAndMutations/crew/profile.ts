import { createProfile } from "@/lib/api/crew/profile";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useCreateProfile = () => {
  return useMutation({
    mutationFn: createProfile,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return;
    },
  });
};
