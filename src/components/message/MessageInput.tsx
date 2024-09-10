"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdSend } from "react-icons/md";
import { FormEvent } from "react";
import useWebSocket from "@/hooks/useWebSocket";
import Cookies from "js-cookie";

export default function MessageInput() {
  const accessToken = Cookies.get("accessToken") || "";

  const { sendMessage } = useWebSocket("2", accessToken);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const message = formData.get("message") as string;

    if (message.trim()) {
      sendMessage({ type: "chat", data: message });

      event.currentTarget.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2 p-4 border-t-4">
      <Input
        id="message"
        name="message"
        placeholder="Type your message..."
        className="flex-1"
        autoComplete="off"
      />
      <Button type="submit" size="icon">
        <span className="sr-only">Send</span>
        <MdSend className="h-4 w-4" />
      </Button>
    </form>
  );
}
