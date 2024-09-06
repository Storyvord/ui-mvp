// hooks/useWebSocket.ts
import { useEffect, useRef, useState } from "react";

interface WebSocketMessage {
  type: string;
  content: string;
}

interface UseWebSocketReturn {
  messages: WebSocketMessage[];
  sendMessage: (message: WebSocketMessage) => void;
}

export const useWebSocket = (url: string): UseWebSocketReturn => {
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      socketRef.current = new WebSocket(url);

      // WebSocket Connection Opened
      socketRef.current.onopen = () => {
        console.log("WebSocket connection established.");
      };

      // Handle incoming messages
      socketRef.current.onmessage = (event) => {
        try {
          const data: WebSocketMessage = JSON.parse(event.data);
          setMessages((prevMessages) => [...prevMessages, data]);
        } catch (error) {
          console.error("Error parsing WebSocket message", error);
        }
      };

      // Handle WebSocket errors
      socketRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      // Handle WebSocket close
      socketRef.current.onclose = (event) => {
        console.log("WebSocket connection closed", event);
      };

      // Cleanup WebSocket on component unmount
      return () => {
        socketRef.current?.close();
      };
    }
  }, [url]);

  // Function to send a message to the server
  const sendMessage = (message: WebSocketMessage) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.log("WebSocket is not open. Cannot send message.");
    }
  };

  return { messages, sendMessage };
};
