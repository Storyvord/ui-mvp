<<<<<<< HEAD
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
=======
// components/MessageInput.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdSend } from "react-icons/md";

export default function MessageInput() {
  return (
    <form className="flex w-full items-center space-x-2 p-4 border-t-4">
      <Input
        id="message"
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
>>>>>>> origin/message
