"use client";
import React, { useState, useEffect, useRef, FormEvent, Suspense } from "react";
import { w3cwebsocket as W3CWebSocket, IMessageEvent } from "websocket";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

import ChatWindow from "@/components/message/ChatWindow";
import {
  useGetConversationsList,
  useGetMessages,
} from "@/lib/react-query/queriesAndMutations/message";
import Loader from "../Loader";

type Message = {
  message: string;
  sender: string;
};

const Message: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isErrorConnection, setIsErrorConnection] = useState<boolean>(false);
  const clientRef = useRef<W3CWebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const token = Cookies.get("accessToken");
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiverId") || "";
  const receiverName = searchParams.get("name") || "";
  const senderId = JSON.parse(localStorage.getItem("user-details") || "{}").id;

  const { data: conversationsList } = useGetConversationsList();
  const { data } = useGetMessages(receiverId);
  useEffect(() => {
    if (data) {
      const newMappedMessages = data.map((item: { text: string; sender: { id: number } }) => ({
        message: item.text,
        sender: item.sender.id,
      }));
      setMessages(newMappedMessages);
    }
  }, [data]);

  // Scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll effect when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!receiverId || !token) {
      // console.error("Missing receiverId or token.");
      return;
    }

    const wsUrl = `wss://api-dev.storyvord.com:8001/ws/chat/user/${receiverId}/?access_token=${token}`;
    const wsClient = new W3CWebSocket(wsUrl);
    clientRef.current = wsClient;

    wsClient.onopen = () => {
      console.log("WebSocket Client Connected");
      setIsConnected(true);
    };

    // WebSocket message handler
    wsClient.onmessage = (messageEvent: IMessageEvent) => {
      try {
        const dataFromServer = JSON.parse(messageEvent.data as string);

        // Check if it's a message from another user
        if (
          dataFromServer.message &&
          dataFromServer.sender &&
          Number(dataFromServer.sender.id) !== Number(senderId) &&
          dataFromServer.recipient &&
          Number(dataFromServer.recipient.id) === Number(senderId)
        ) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { message: dataFromServer.message, sender: dataFromServer.sender.name || "Unknown" },
          ]);
        }
      } catch (error) {
        // console.error("Error parsing WebSocket message:", error);
      }
    };

    wsClient.onerror = (error) => {
      setIsErrorConnection(true);
      // console.error("WebSocket Error:", error);
      // alert("WebSocket connection failed. Please try again.");
    };

    wsClient.onclose = (event) => {
      // console.warn("WebSocket closed:", event);
      setIsConnected(false);
    };

    return () => {
      if (clientRef.current?.readyState === W3CWebSocket.OPEN) {
        clientRef.current.close();
      }
      clientRef.current = null;
    };
  }, [receiverId, token, senderId]);

  // Handle sending messages
  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (clientRef.current && clientRef.current.readyState === W3CWebSocket.OPEN) {
      const outgoingMessage = JSON.stringify({ message });
      clientRef.current.send(outgoingMessage);
      setMessages((prevMessages) => [...prevMessages, { message: message, sender: senderId }]);
      setMessage("");
    } else {
      // console.log("WebSocket is not open.");
    }
  };
  return (
    <div className="mx-auto p-4">
      {isErrorConnection && <p className=" w-full p-4 text-center">Failed to connect</p>}
      <ChatWindow
        receiverName={receiverName}
        messages={messages}
        messagesEndRef={messagesEndRef}
        conversationsList={conversationsList!}
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

const MessageComponent = () => (
  <Suspense
    fallback={
      <div className=" w-full p-4 mt-8 flex justify-center">
        <Loader />
      </div>
    }
  >
    <Message />
  </Suspense>
);

export default MessageComponent;
