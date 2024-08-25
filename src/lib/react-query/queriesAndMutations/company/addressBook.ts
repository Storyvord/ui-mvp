import { createAddressBook, deleteAddressBook, getAddressBook } from "@/lib/api/company/addressBook";
import { useMutation, useQuery, useQueryClient } from "react-query";

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
    onError: (error) => {
      console.error("Error submitting create address book:", error);
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
    onError: (error) => {
      console.error("Error deleting address book:", error);
    },
  });
};
