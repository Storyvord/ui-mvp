import { USER_API } from "@/constant/constant";
import Cookies from "js-cookie";

export const sendMessage = async (formData: any) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/inbox/messages/1/send/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error("Failed to sent message");
  }
  return res.json();
};

export const readMessage = async (formData: any) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/inbox/messages/1/read/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error("Failed to read message");
  }
  return res.json();
};

export const getMessageList = async () => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/inbox/dialogs/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to get message list");
  }
  return res.json();
};

export const getMessages = async (receiverId: string) => {
  const token = Cookies.get("accessToken");
  try {
    const res = await fetch(`${USER_API}/api/inbox/dialogs/${receiverId}/messages/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }

    return res.json();
  } catch (err) {
    console.log("API error from :: getTasks ::", err);
  }
};

export const getConversationsList = async () => {
  const token = Cookies.get("accessToken");
  try {
    const res = await fetch(`${USER_API}/api/inbox/dialogs/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch dialogs");
    }

    return res.json();
  } catch (err) {
    console.log("API error from :: getTasks ::", err);
  }
};
