import { getOnBoardedCrewList, sentInvitationToCrew } from "@/lib/api/crew";
import { getMessages } from "@/lib/api/message";
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

export const useGetMessages = (receiverId: string) => {
  return useQuery({
    queryKey: ["getMessages"],
    queryFn: () => getMessages(receiverId),
  });
};
