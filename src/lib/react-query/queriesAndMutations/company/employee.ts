import {
  acceptCompanyInvitation,
  getCompanyInvitations,
  getOnBoardedEmployeeList,
  rejectCompanyInvitation,
  sentInvitationToEmployee,
} from "@/lib/api/company/employee";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useSentInvitationToEmployee = () => {
  return useMutation({
    mutationFn: sentInvitationToEmployee,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useGetOnBoardedEmployeeList = () => {
  return useQuery({
    queryKey: ["getOnBoardedEmployeeList"],
    queryFn: () => getOnBoardedEmployeeList(),
  });
};

export const useGetCompanyInvitations = () => {
  return useQuery({
    queryKey: ["getCompanyInvitations"],
    queryFn: getCompanyInvitations,
  });
};

export const useAcceptCompanyInvitation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: acceptCompanyInvitation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getCompanyInvitations"],
      });
      return data;
    },
  });
};

export const useRejectCompanyInvitation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectCompanyInvitation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getCompanyInvitations"],
      });
      return data;
    },
  });
};
