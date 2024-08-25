import { getOnBoardedCrewList, sentInvitationToCrew } from "@/lib/api/crew";
import { useMutation, useQuery } from "react-query";

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

export const useGetOnBoardedCrewList = (projectId: string) => {
  return useQuery({
    queryKey:["getOnBoardedCrewList"],
    queryFn:() => getOnBoardedCrewList(projectId)
  })
}