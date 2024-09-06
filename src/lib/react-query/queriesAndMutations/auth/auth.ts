import { getUserDetails, registerUser, userSignIn } from "@/lib/api/auth/auth";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Cookies from "js-cookie";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log(data);
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
      Cookies.set("accessToken", data.access);

      queryClient.invalidateQueries({
        queryKey: ["ongoingProjects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["userDetails"],
      });
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
    cacheTime: 0, // Disable caching
    staleTime: 0, // Data is always considered stale
  });
};
