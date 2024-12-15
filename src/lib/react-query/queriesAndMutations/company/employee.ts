import {
  acceptCompanyInvitation,
  getOnBoardedEmployeeList,
  getReceivedInvitationsList,
  getSendInvitationsList,
  rejectCompanyInvitation,
  sentInvitationToEmployee,
} from "@/lib/api/company/employee";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useSentInvitationToEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sentInvitationToEmployee,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getSendInvitationsList"],
      });
      return data;
    },
  });
};

export const useGetOnBoardedEmployeeList = (companyID?: number) => {
  return useQuery({
    queryKey: ["getOnBoardedEmployeeList", companyID],
    queryFn: () => getOnBoardedEmployeeList(companyID!),
    enabled: !!companyID, // Query only runs when companyID is truthy
  });
};

export const useGetReceivedInvitationsList = () => {
  return useQuery({
    queryKey: ["getReceivedInvitationsList"],
    queryFn: getReceivedInvitationsList,
  });
};
export const useGetSendInvitationsList = () => {
  return useQuery({
    queryKey: ["getSendInvitationsList"],
    queryFn: getSendInvitationsList,
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
