import { getUserDetails, registerUser, userSignIn } from "@/lib/api/auth/auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useUserSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userSignIn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getProjects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["userDetails"],
      });
      return data;
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useGetUserDetails = () => {
  return useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const token = Cookies.get("accessToken");
      if (!token) {
        throw new Error("No auth token found");
      }
      return await getUserDetails(token);
    },
    enabled: !!Cookies.get("accessToken"), // Only fetch if token exists
    // cacheTime: Infinity, // Disable caching
    staleTime: Infinity, // Data is always considered stale
  });
};
