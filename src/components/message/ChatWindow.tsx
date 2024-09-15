"use client";
import React, { FormEvent, useState } from "react";
import ConversationList from "./ConversationList";
import MessageInput from "./MessageInput";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { cn } from "@/lib/utils";

type User = {
  id: number;
  email: string;
  user_type: string; // You may want to specify this as "crew" | "client" if these are the only values
  name: string | null; // Name can be null based on your data
  you: boolean;
};

type Conversation = {
  id: number;
  user1: User;
  user2: User;
};

type Message = {
  message: string;
  sender: string;
};

type ChatWindowProps = {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  receiverName: string;
  conversationsList: Conversation[];
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (e: FormEvent) => void;
};

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  messagesEndRef,
  receiverName,
  conversationsList,
  message,
  setMessage,
  sendMessage,
}) => {
  const senderId = JSON.parse(localStorage.getItem("user-details") || "").id;
  const [isConversationListVisible, setIsConversationListVisible] = useState(true);
  return (
    <main className=" flex sm:p-8 gap-2">
      <section
        className={cn(
          "flex-[0.2] border rounded p-2 bg-white relative",
          isConversationListVisible && "block",
          !isConversationListVisible && "hidden"
        )}
      >
        <RxCross2
          onClick={() => setIsConversationListVisible((prev) => !prev)}
          className=" w-6 h-6 sm:hidden block absolute cursor-pointer"
        />
        <h1 className="w-full text-center border-b pb-2 font-semibold">Chats</h1>
        <ConversationList conversations={conversationsList} senderId={senderId} />
      </section>
      <section className=" flex-1 border rounded p-2 bg-white relative">
        <RxHamburgerMenu
          onClick={() => setIsConversationListVisible((prev) => !prev)}
          className=" w-6 h-6 sm:hidden block absolute cursor-pointer"
        />
        <h1 className="w-full border-b pb-2 pl-8 sm:pl-2 font-semibold">{receiverName}</h1>
        <main className=" h-96 overflow-auto p-4 ">
          {messages?.map((message, index) => (
            <div
              key={index}
              className={`flex mb-2 ${message.sender == senderId ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs p-2 rounded-lg ${
                  message.sender == senderId ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
                }`}
              >
                <p>{message.message}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </main>
        {receiverName && (
          <MessageInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
        )}
      </section>
    </main>
  );
};

export default React.memo(ChatWindow);
