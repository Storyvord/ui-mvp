import {
  createCallSheet,
  deleteCallSheet,
  editCallSheet,
  getCallSheetDetails,
  getCallSheets,
} from "@/lib/api/callsheet";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useCreateCallSheet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCallSheet,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getCaSheets"],
      });
      return data;
    },
    // onError: (error) => {
    //   console.log(error)
    //   throw error;
    // },
  });
};
export const useGetCallSheets = (projectId: string) => {
  return useQuery({
    queryKey: ["getCaSheets"],
    queryFn: () => getCallSheets(projectId),
  });
};

export const useEditCallSheet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editCallSheet,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCaSheets"],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useGetCallSheetDetails = (id: number) => {
  return useQuery({
    queryKey: ["getCaSheetDetails"],
    queryFn: () => getCallSheetDetails(id),
  });
};

// Delete call sheet hook
export const useDeleteCallSheet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCallSheet,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCaSheets"],
      });
    },
    onError: (error) => {
      throw error;
    },
  });
};

// Edit call sheet hook
