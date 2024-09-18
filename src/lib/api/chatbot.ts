import { NEW_API_URL } from "@/constant/constant";
import Cookies from "js-cookie";

// Chatbot api
export const chatbot = async (message: string) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${NEW_API_URL}/api/chat/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) {
    throw res;
  }
  return res.json();
};
