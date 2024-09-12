"use client";
import React, { useState, useEffect, FormEvent, useRef } from "react";
import { w3cwebsocket as W3CWebSocket, IMessageEvent } from "websocket";
import ChatWindow from "@/components/message/ChatWindow";
import MessageInput from "@/components/message/MessageInput";
import ConnectionForm from "@/components/message/ConnectionForm";
import Cookies from "js-cookie";
import { USER_API } from "@/constant/constant";
import { useGetMessages } from "@/lib/react-query/queriesAndMutations/message";
import { useSearchParams } from "next/navigation";

type Message = {
  message: string;
  sender: string;
};

const Message: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const clientRef = useRef<W3CWebSocket | null>(null);
  const token = Cookies.get("accessToken");

  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiverId") || "";
  const receiverName = searchParams.get("name") || "";

  const senderId = JSON.parse(localStorage.getItem("user-details") || "{}").id;

  const { data } = useGetMessages("19");
  console.log(data);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (receiverId && token) {
      const wsUrl = `wss://api-stage.storyvord.com:8001/ws/chat/${receiverId}/?access_token=${token}`;

      const wsClient = new W3CWebSocket(wsUrl);
      clientRef.current = wsClient;

      wsClient.onopen = () => {
        console.log("WebSocket Client Connected");
        setIsConnected(true);
      };

      wsClient.onmessage = (messageEvent: IMessageEvent) => {
        const dataFromServer = JSON.parse(messageEvent.data as string);
        if (dataFromServer && dataFromServer.sender !== String(senderId)) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { message: dataFromServer.message, sender: dataFromServer.sender },
          ]);
        }
      };

      wsClient.onerror = (error) => {
        console.error("WebSocket Error: ", error);
        alert("WebSocket connection failed. Please try again.");
        setIsConnected(false);
      };

      wsClient.onclose = (event) => {
        console.warn("WebSocket closed: ", event);
        setIsConnected(false);
      };

      return () => {
        if (wsClient.readyState === W3CWebSocket.OPEN) {
          wsClient.close();
        }
        clientRef.current = null;
      };
    }
  }, [receiverId, token, senderId]);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (clientRef.current && clientRef.current.readyState === W3CWebSocket.OPEN) {
      clientRef.current.send(JSON.stringify({ message }));
      setMessages((prevMessages) => [...prevMessages, { message: message, sender: senderId }]);
      setMessage("");
    } else {
      console.log("WebSocket is not open.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {isConnected ? (
        <>
          <ChatWindow
            receiverName={receiverName}
            messages={messages}
            messagesEndRef={messagesEndRef}
          />
          <MessageInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </>
      ) : (
        <p>Failed to connect</p>
      )}
    </div>
  );
};

export default Message;
