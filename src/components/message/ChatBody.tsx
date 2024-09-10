"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  content: string;
  type: "sent" | "received";
}
const user = JSON.parse(localStorage.getItem("user-details") || "");
const token = Cookies.get("accessToken") || "";
// Fetch messages function with typing
const fetchMessages = async (): Promise<Message[]> => {
  const response = await fetch(
    `https://api-stage.storyvord.com/api/inbox/dialogs/${user.id}/messages/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }
  const data = await response.json();
  return data;
};
export default function ChatBody() {
  // Use the Message type for the state
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Fetch and set messages, handle errors
    fetchMessages()
      .then(setMessages)
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);
  return (
    <ScrollArea className="h-[calc(100vh-112px)] p-4 grid gap-4">
      <h2>Messages</h2>
      <ul>
        {messages.map((msg) => (
          <li key={msg.content}>{msg.content}</li>
        ))}
      </ul>
    </ScrollArea>
  );
}
