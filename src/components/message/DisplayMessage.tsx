"use client";
import React from "react";

type Message = {
  message: string;
  sender?: number;
};

type DisplayMessageProps = {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  senderId: number;
};

const DisplayMessage: React.FC<DisplayMessageProps> = ({
  messages,
  messagesEndRef,
  senderId,
}) => {
  return (
    <main className="h-full flex-1 overflow-auto p-4">
      {messages?.map((message, index) => (
        <div
          key={index}
          className={`flex mb-2 ${Number(message.sender) === Number(senderId) ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-sm p-2 px-4 rounded-3xl ${
              Number(message.sender) === Number(senderId) ? "bg-[#001835] text-white rounded-tr-none" : "bg-[#D9FFE9] text-black rounded-tl-none"
            }`}
          >
            <p>{message.message}</p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </main>
  );
};

export default DisplayMessage;
