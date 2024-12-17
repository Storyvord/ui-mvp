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
    <form onSubmit={sendMessage} className=" flex gap-2">
      <input
        type="text"
        placeholder="Write your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 rounded-none border-none h-12 px-4 py-2 focus:outline-none focus:ring-none focus:border-none"
      />
      {/* <Button type="submit">
        Send
      </Button> */}
    </form>
  );
};

export default MessageInput;
