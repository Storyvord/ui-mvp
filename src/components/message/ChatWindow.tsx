"use client";
import React from "react";

type Message = {
  message: string;
  sender: string;
};

type ChatWindowProps = {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  receiverName: string;
};

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, messagesEndRef, receiverName }) => {
  const senderId = JSON.parse(localStorage.getItem("user-details") || "").id;
  console.log(senderId);

  return (
    <>
      <h1 className="text-center">
        <b>chat with:</b> {receiverName}
      </h1>
      <div className="mt-12 h-80 overflow-auto p-4 border rounded">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex mb-2 ${message.sender === senderId ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs p-2 rounded-lg ${
                message.sender === senderId ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
              }`}
            >
              <h3 className="font-semibold">
                {message.sender === senderId ? "You" : message.sender}
              </h3>
              <p>{message.message}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
};

export default React.memo(ChatWindow);
