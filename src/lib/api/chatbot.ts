import { NEW_API_URL } from "@/constant/constant";
import { customFetch } from "./api";

// Chatbot api
export const chatbot = async (message: string) => {
  return customFetch(`${NEW_API_URL}/api/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });
};

// Chatbot api
export const getPreviousChatbotSessions = async (message: string) => {
  return customFetch(`${NEW_API_URL}/api/ai_chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });
};
