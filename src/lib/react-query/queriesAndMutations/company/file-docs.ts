import {
  createCompanyFileDocumentRoom,
  deleteCompanyFile,
  deleteCompanyRoom,
  getAllCompanyFiles,
  getCompanyFileDocumentRooms,
  updateCompanyRoom,
  uploadCompanyFile,
} from "@/lib/api/company/file-docs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetCompanyFileDocumentRooms = (companyId: string) => {
  return useQuery({
    queryKey: ["getCompanyFileDocumentRooms"],
    queryFn: () => getCompanyFileDocumentRooms(companyId),
    enabled: !!companyId, // Query only runs when companyID is truthy
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
  });
};

export const useDeleteCompanyRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCompanyRoom,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getCompanyFileDocumentRooms"],
      });
      return data;
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useUpdateCompanyRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCompanyRoom,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getCompanyFileDocumentRooms"],
      });
      return data;
    },
    onError: (error) => {
      throw error;
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
  });
};
