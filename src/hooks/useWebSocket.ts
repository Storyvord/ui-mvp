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
