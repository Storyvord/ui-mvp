import { useMutation, useQuery, useQueryClient } from "react-query";
import { postPersonalDetails, postUserType } from "@/lib/api/onBoard/onBoard";

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
        onError: (error) => {
        console.error(error);
        },
    });
};

export const usePostPesonalDetails = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postPersonalDetails,
        onSuccess: (data) => {
        queryClient.invalidateQueries({
            queryKey: ["userProfile"],
        });
            return data;
        },
        onError: (error) => {
            console.error(error);
        },
    });
  };
