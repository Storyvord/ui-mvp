"use client";
import creation from "@/assets/icons/creation";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { IMessageEvent, w3cwebsocket as W3CWebSocket } from "websocket";
import { ChatbotDetails } from "./ChatbotDetails";

export default function Chatbot() {
  const [openChat, setOpenChat] = useState(false); //open or close modal
  const [conversation, setConversation] = useState<Array<Conversation>>([]); //store conversation

  const clientRef = useRef<W3CWebSocket | null>(null);

  const token = Cookies.get("accessToken");
  useEffect(() => {
    const wsUrl = `wss://api-stage.storyvord.com:8001/ws/ai_assistant/?access_token=${token}`;
    const wsClient = new W3CWebSocket(wsUrl);
    clientRef.current = wsClient;

    // WebSocket message handler
    wsClient.onmessage = (messageEvent: IMessageEvent) => {
      try {
        const dataFromServer = JSON.parse(messageEvent.data as string);
        // Check for response
        if (dataFromServer.ai_response) {
          setConversation((prevConvo) => [
            ...prevConvo,
            { queryType: "answer", data: dataFromServer.ai_response },
          ]);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    wsClient.onerror = (error) => {
      alert("WebSocket connection failed. Please try again.");
    };

    return () => {
      if (clientRef.current?.readyState === W3CWebSocket.OPEN) {
        clientRef.current.close();
      }
      clientRef.current = null;
    };
  }, [token]);

  // Handle sending messages
  const sendMessage = (question: string) => {
    if (clientRef.current && clientRef.current.readyState === W3CWebSocket.OPEN) {
      const outgoingMessage = JSON.stringify({ message: question });
      clientRef.current.send(outgoingMessage);
      setConversation((prevConvo) => [...prevConvo, { queryType: "question", data: question }]);
    } else {
      console.log("WebSocket is not open.");
    }
  };

  return (
    <div className="opacity-100">
      <button
        onClick={() => setOpenChat(!openChat)}
        className="fixed bottom-5 right-5 grid place-items-center border border-gray-400 rounded-sm w-[3rem] h-[3rem] p-1"
      >
        {creation}
      </button>
      {openChat && (
        <div className="fixed bottom-20 right-5 z-50 shadow-xl">
          <ChatbotDetails conversation={conversation} sendMessage={sendMessage} />
        </div>
      )}
    </div>
  );
}
