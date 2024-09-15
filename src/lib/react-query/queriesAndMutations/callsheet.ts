
import { CallSheet } from "@/app/(user-dashboard)/project-details/[id]/(planning)/call-sheets/types";
import { createCallSheet, deleteCallSheet, editCallSheet, getCallSheet } from "@/lib/api/callsheet";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "react-query";


// Create call sheet hook
export const useCreateCallSheet = () => {
 
    return useMutation({
      mutationFn: createCallSheet,
      onSuccess: (data) => {
        console.log(data);
        return data;
      },
      onError: (error) => {
        console.error("Error creating call sheet:", error);
      },
    });
  };
  
  // get call sheet data
  export const useGetCallSheet = (id:number) => {  
    return useQuery({
      queryKey: ["callSheetDetails", id],
      queryFn: () => getCallSheet(id),
      onSuccess: (data) => {
        console.log("Data fetched successfully:", data);
        return data;
      },
      onError: (error) => {
        console.error("Error fetching call sheet:", error);
      },
    });
  };
  
  
  // Delete call sheet hook
  export const useDeleteCallSheet = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: deleteCallSheet,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["deleteCallSheet"],
        });
      },
      onError: (error) => {
        console.error("Error in deleting project:", error);
      },
    });
  };
  
  // Edit call sheet hook
  export const useEditCallSheet = () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: editCallSheet,
        onSuccess: () => {
          queryClient.invalidateQueries(["editCallSheet"]);
        },
        onError: (error) => {
          console.error(error);
        },
      });
    };