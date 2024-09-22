import { chatbot } from "@/lib/api/chatbot";
import { useMutation } from "@tanstack/react-query";

// Create call sheet hook
export const useChatMutation = () => {
  return useMutation({
    mutationFn: chatbot,
  });
};
