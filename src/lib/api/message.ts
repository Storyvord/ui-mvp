import { NEW_API_URL_V2, USER_API } from "@/constant/constant";
import { customFetch } from "./api";

export const sendMessage = async (formData: any) => {
  return customFetch(`${NEW_API_URL_V2}/inbox/messages/1/send/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

export const readMessage = async (formData: any) => {
  return customFetch(`${NEW_API_URL_V2}/inbox/messages/1/read/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

export const getMessageList = async () => {
  return customFetch(`${USER_API}/api/inbox/dialogs/`, {
    method: "GET",
  });
};

export const getMessages = async (receiverId: string) => {
  if (!receiverId) return;
  return customFetch(`${NEW_API_URL_V2}/inbox/dialogs/${receiverId}/messages/`, {
    method: "GET",
  });
};

export const getConversationsList = async () => {
  return customFetch(`${NEW_API_URL_V2}/inbox/dialogs/`, {
    method: "GET",
  });
};
