import {
  createCompanyFileDocumentRoom,
  deleteCompanyFile,
  getAllCompanyFiles,
  getCompanyFileDocumentRooms,
  uploadCompanyFile,
} from "@/lib/api/company/file-docs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetCompanyFileDocumentRooms = () => {
  return useQuery({
    queryKey: ["getCompanyFileDocumentRooms"],
    queryFn: getCompanyFileDocumentRooms,
  });
};

export const useCreateCompanyFileDocumentRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCompanyFileDocumentRoom,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getCompanyFileDocumentRooms"],
      });
      return data;
    },
    onError: (error) => {
      console.error("Error submitting create create company room form:", error);
    },
  });
};

export const useGetAllCompanyFiles = (roomId: string) => {
  return useQuery({
    queryKey: ["getAllCompanyFiles", roomId],
    queryFn: () => getAllCompanyFiles(roomId),
  });
};

export const useUploadCompanyFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadCompanyFile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getAllCompanyFiles"],
      });
      return data;
    },
    onError: (error) => {
      console.error("Error uploading company file:", error);
    },
  });
};

export const useDeleteCompanyFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCompanyFile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getAllCompanyFiles"],
      });
      return data;
    },
    onError: (error) => {
      console.error("Error deleting company file:", error);
    },
  });
};
