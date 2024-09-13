import React, { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type MessageInputProps = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (e: FormEvent) => void;
};

const MessageInput: React.FC<MessageInputProps> = ({ message, setMessage, sendMessage }) => {
  return (
    <form onSubmit={sendMessage} className="mt-4 flex gap-2">
      <Input
        type="text"
        placeholder="Write your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1"
      />
      <Button type="submit">
        Send
      </Button>
    </form>
  );
};

export default MessageInput;
