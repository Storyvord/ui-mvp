<<<<<<< HEAD
import { useEffect, useRef } from 'react';

type MessageType = {
  type: string;
  data: any;
};

const useWebSocket = (userId: string, accessToken: string) => {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // WebSocket URL
    const wsUrl = `wss://api-stage.storyvord.com:8001/ws/chat/${userId}/?access_token=${accessToken}`;

    // Initialize WebSocket
    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onopen = () => {
      console.log('WebSocket connection established');
    };

    wsRef.current.onmessage = (event: MessageEvent) => {
      try {
        const message: MessageType = JSON.parse(event.data);
        console.log('Received message:', message);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    wsRef.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    wsRef.current.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup function to close WebSocket when component unmounts
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [userId, accessToken]);

  // Function to send messages
  const sendMessage = (message: MessageType) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open. Unable to send message.');
    }
  };

  return { sendMessage };
};

export default useWebSocket;
=======
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
>>>>>>> origin/message
