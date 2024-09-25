import {
  createCallSheet,
  deleteCallSheet,
  editCallSheet,
  getCallSheetDetails,
  getCallSheets,
} from "@/lib/api/callsheet";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCallSheet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCallSheet,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getCallSheets"],
      });
      return data;
    },
  });
};
export const useGetCallSheets = (projectId: string) => {
  return useQuery({
    queryKey: ["getCallSheets"],
    queryFn: () => getCallSheets(projectId),
  });
};

export const useEditCallSheet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editCallSheet,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getCallSheets"],
      });
      return data;
    },
  });
};

export const useGetCallSheetDetails = (id: number) => {
  return useQuery({
    queryKey: ["getCallSheetDetails", id],
    queryFn: () => getCallSheetDetails(id),
    staleTime: 0,
  });
};

// Delete call sheet hook
export const useDeleteCallSheet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCallSheet,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCallSheets"],
      });
    },
  });
};
