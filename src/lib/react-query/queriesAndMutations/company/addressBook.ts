import {
  createAddressBook,
  deleteAddressBook,
  getAddressBook,
} from "@/lib/api/company/addressBook";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetAddressBook = () => {
  return useQuery({
    queryKey: ["getAddressBook"],
    queryFn: getAddressBook,
  });
};

export const useCreateAddressBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAddressBook,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getAddressBook"],
      });
      return data;
    },
  });
};

export const useDeleteAddressBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAddressBook,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getAddressBook"],
      });
      return data;
    },
  });
};
