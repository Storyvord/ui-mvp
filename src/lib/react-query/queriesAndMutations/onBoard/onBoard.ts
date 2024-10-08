import { useMutation, useQuery, useQueryClient } from "react-query";
import { postUserType } from "@/lib/api/onBoard/onBoard";

export const useSelectUserType = () => {
  return useMutation({
    mutationFn: postUserType,
    onSuccess: (data) => {
      console.log(data);
      return data;
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

