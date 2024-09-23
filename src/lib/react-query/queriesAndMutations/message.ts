import { sentInvitationToCrew } from "@/lib/api/crew";
import { getConversationsList, getMessages } from "@/lib/api/message";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useSentInvitationToCrew = () => {
  return useMutation({
    mutationFn: sentInvitationToCrew,
    onSuccess: (data) => {
      return data;
    },
  });
};

export const useGetMessages = (receiverId: string) => {
  return useQuery({
    queryKey: ["getMessages", receiverId],
    queryFn: () => getMessages(receiverId),
  });
};

export const useGetConversationsList = () => {
  return useQuery({
    queryKey: ["getConversationsList"],
    queryFn: getConversationsList,
  });
};
