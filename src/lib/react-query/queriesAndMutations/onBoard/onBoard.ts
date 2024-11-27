import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postPersonalDetails, postUserType, skipOnBoard } from "@/lib/api/onBoard/onBoard";

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

export const useSkipOnBoard = () => {
  return useMutation({
    mutationFn: skipOnBoard,
    onSuccess: (data) => {
      return data;
    },
  });
};
