import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  postPersonalDetails,
  postUserType,
  skipOnBoard,
  updatePersonalDetails,
} from "@/lib/api/onBoard/onBoard";

export const useSelectUserType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postUserType,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
      });
      return data;
    },
  });
};

export const usePostPersonalDetails = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postPersonalDetails,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
      });
      return data;
    },
  });
};
export const useUpdatePersonalDetails = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePersonalDetails,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
      });
      return data;
    },
    onError: async (error) => {
      throw error;
    },
  });
};

export const useSkipOnBoard = () => {
  return useMutation({
    mutationFn: skipOnBoard,
    onSuccess: (data) => {
      return data;
    },
  });
};
