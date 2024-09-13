import { getOnBoardedCrewList, sentInvitationToCrew } from "@/lib/api/crew";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useSentInvitationToCrew = () => {
  return useMutation({
    mutationFn: sentInvitationToCrew,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useGetCrewList = (projectId: string) => {
  return useQuery({
    queryKey: ["getOnBoardedCrewList", projectId],
    queryFn: () => getOnBoardedCrewList(projectId),
  });
};
