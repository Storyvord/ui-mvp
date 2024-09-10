// import ChatBody from "@/components/message/ChatBody";
// import ChatHeader from "@/components/message/ChatHeader";
// import ChatList from "@/components/message/ChatList";
// import MessageInput from "@/components/message/MessageInput";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { FaPlus } from "react-icons/fa";

// export default function Component() {
//   return (
//     <div className="grid grid-cols-[300px_1fr] bg-white w-full mx-auto overflow-hidden border rounded-lg">
//       <div className="bg-muted/20 p-4 border-r">
//         <div className="flex items-center justify-between space-x-4">
//           <div className="font-medium text-sm">Chats</div>
//           <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
//             <FaPlus className="h-4 w-4" />
//             <span className="sr-only">New chat</span>
//           </Button>
//         </div>
//         <div className="py-4">
//           <Input placeholder="Search" className="h-8" />
//         </div>
//         <ChatList />
//       </div>
//       <div>
//         <ChatHeader />
//         <ChatBody />
//         <MessageInput />
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect, FormEvent } from "react";
import Cookies from "js-cookie";
import { w3cwebsocket, IMessageEvent } from "websocket"; // Importing the WebSocket client and IMessageEvent
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define the types for message objects
type Message = {
  msg: string;
  name: string;
};

const App: React.FC = () => {
  // State management using React Hooks
  const [filledForm, setFilledForm] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [receiverId, setReceiverId] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false); // Track WebSocket connection status
  const [client, setClient] = useState<w3cwebsocket | null>(null); // WebSocket connection state

  // Access token from cookies
  const token = Cookies.get("accessToken");

  // Establish WebSocket connection using w3cwebsocket
  useEffect(() => {
    if (filledForm && receiverId && token) {
      const wsUrl = `wss://api-stage.storyvord.com:8001/ws/chat/${receiverId}/?access_token=${token}`;

      try {
        const wsClient = new w3cwebsocket(wsUrl); // Using w3cwebsocket client
        setClient(wsClient); // Save client to state

        wsClient.onopen = () => {
          console.log("WebSocket Client Connected");
          setIsConnected(true); // Set connection status to true
        };

        wsClient.onmessage = (messageEvent: IMessageEvent) => {
          const dataFromServer = JSON.parse(messageEvent.data as string); // Cast data to string
          if (dataFromServer) {
            setMessages((prevMessages) => [
              ...prevMessages,
              { msg: dataFromServer.text, name: dataFromServer.sender },
            ]);
          }
        };

        wsClient.onerror = (error) => {
          console.error("WebSocket Error: ", error);
          alert("WebSocket connection failed. Please try again."); // Alert on connection error
          setIsConnected(false); // Set connection status to false
        };

        wsClient.onclose = (event) => {
          console.warn("WebSocket closed: ", event);
          setIsConnected(false); // Set connection status to false
        };

        // Cleanup function to close WebSocket on unmount or when dependencies change
        return () => {
          if (wsClient.readyState === w3cwebsocket.OPEN) {
            wsClient.close();
          }
        };
      } catch (error) {
        console.error("WebSocket initialization error: ", error);
        alert("WebSocket initialization failed. Please check your connection and try again."); // Alert on initialization error
      }
    }
  }, [filledForm, receiverId, token]); // Dependencies array to reconnect if any value changes

  // Handler to send message through WebSocket
  const onButtonClicked = (e: FormEvent) => {
    e.preventDefault();
    if (client && client.readyState === w3cwebsocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "message",
          text: message,
          sender: name,
          receiver: receiverId,
        })
      );
      setMessage("");
    } else {
      console.log("WebSocket is not open.");
    }
  };

  // JSX with Tailwind CSS for layout and design
  return (
    <div className="container mx-auto p-4">
      {filledForm && isConnected ? (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Chat with: {receiverId}</h2>
          <div className="h-80 overflow-auto p-4 border rounded">
            {messages.map((message, index) => (
              <div key={index} className="p-2 mb-2 border-b">
                <h3 className="font-semibold">{message.name}</h3>
                <p>{message.msg}</p>
              </div>
            ))}
          </div>
          <form onSubmit={onButtonClicked} className="mt-4">
            <Input
              type="text"
              placeholder="Write your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Send Message
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <form
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              setFilledForm(true);
              // Initialize the WebSocket connection
              if (receiverId && token) {
                const wsClient = new w3cwebsocket(
                  `wss://api-stage.storyvord.com:8001/ws/chat/${receiverId}/?access_token=${token}`
                );
                setClient(wsClient);
              }
            }}
            className="w-full max-w-xs mt-8"
          >
            <Input
              type="text"
              placeholder="Receiver ID"
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Button type="submit">Start Chat</Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;

// "use client";
// import React, { useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import ReconnectingWebSocket from 'reconnecting-websocket';  // Importing ReconnectingWebSocket

// const App = () => {
//   // State management using React Hooks
//   const [filledForm, setFilledForm] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [name, setName] = useState('');
//   const [receiverId, setReceiverId] = useState('');
//   const [isConnected, setIsConnected] = useState(false); // Track WebSocket connection status

//   // Access token from cookies
//   const token = Cookies.get("accessToken");

//   // WebSocket connection state
//   const [client, setClient] = useState(null);

//   // Establish WebSocket connection using ReconnectingWebSocket
//   useEffect(() => {
//     if (filledForm && receiverId && token) {
//       const wsUrl = `wss://api-stage.storyvord.com:8001/ws/chat/${receiverId}/?access_token=${token}`;

//       // Custom options for ReconnectingWebSocket
//       const options = {
//         connectionTimeout: 3000,       // Timeout before retrying connection
//         maxRetries: 10,                // Maximum retries before giving up
//         minReconnectionDelay: 1000,    // Minimum delay between reconnections
//         maxReconnectionDelay: 10000,   // Maximum delay between reconnections
//         reconnectionDelayGrowFactor: 1.5, // Delay growth factor
//         debug: true,                   // Enable debug output
//       };

//       // Initialize ReconnectingWebSocket
//       const wsClient = new ReconnectingWebSocket(wsUrl, [], options);
//       setClient(wsClient);  // Save client to state

//       wsClient.addEventListener('open', () => {
//         console.log("WebSocket Client Connected");
//         setIsConnected(true); // Set connection status to true
//       });

//       wsClient.addEventListener('message', (message) => {
//         const dataFromServer = JSON.parse(message.data);
//         if (dataFromServer) {
//           setMessages((prevMessages) => [
//             ...prevMessages,
//             { msg: dataFromServer.text, name: dataFromServer.sender },
//           ]);
//         }
//       });

//       wsClient.addEventListener('error', (error) => {
//         console.error("WebSocket Error: ", error);
//         alert("WebSocket connection failed. Please try again."); // Alert on connection error
//         setIsConnected(false); // Set connection status to false
//       });

//       wsClient.addEventListener('close', (event) => {
//         console.warn("WebSocket closed: ", event);
//         setIsConnected(false); // Set connection status to false
//       });

//       // Cleanup function to close WebSocket on unmount or when dependencies change
//       return () => {
//         wsClient.close();
//       };
//     }
//   }, [filledForm, receiverId, token]); // Dependencies array to reconnect if any value changes

//   // Handler to send message through WebSocket
//   const onButtonClicked = (e) => {
//     e.preventDefault();
//     if (client && client.readyState === 1) { // Check if WebSocket is OPEN
//       client.send(
//         JSON.stringify({
//           type: "message",
//           text: message,
//           sender: name,
//           receiver: receiverId,
//         })
//       );
//       setMessage('');
//     } else {
//       console.log("WebSocket is not open.");
//     }
//   };

//   // JSX with Tailwind CSS for layout and design
//   return (
//     <div className="container mx-auto p-4">
//       {filledForm && isConnected ? (
//         <div className="mt-12">
//           <h2 className="text-xl font-bold mb-4">Chat with: {receiverId}</h2>
//           <div className="h-80 overflow-auto p-4 border rounded">
//             {messages.map((message, index) => (
//               <div key={index} className="p-2 mb-2 border-b">
//                 <h3 className="font-semibold">{message.name}</h3>
//                 <p>{message.msg}</p>
//               </div>
//             ))}
//           </div>
//           <form onSubmit={onButtonClicked} className="mt-4">
//             <input
//               type="text"
//               placeholder="Write your message"
//               className="w-full p-2 border rounded mb-2"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//             <button
//               type="submit"
//               className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Send Message
//             </button>
//           </form>
//         </div>
//       ) : (
//         <div className="flex flex-col items-center">
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               setFilledForm(true);
//               // Initialize the ReconnectingWebSocket connection
//               if (receiverId && token) {
//                 const wsUrl = `wss://api-stage.storyvord.com:8001/ws/chat/${receiverId}/?access_token=${token}`;
//                 const wsClient = new ReconnectingWebSocket(wsUrl, [], {
//                   connectionTimeout: 3000,
//                   maxRetries: 10,
//                   minReconnectionDelay: 1000,
//                   maxReconnectionDelay: 10000,
//                   reconnectionDelayGrowFactor: 1.5,
//                   debug: true,
//                 });
//                 setClient(wsClient);
//               }
//             }}
//             className="w-full max-w-xs mt-8"
//           >
//             <input
//               type="text"
//               placeholder="Receiver ID"
//               className="w-full p-2 border rounded mb-2"
//               value={receiverId}
//               onChange={(e) => setReceiverId(e.target.value)}
//               required
//             />
//             <input
//               type="text"
//               placeholder="Your Name"
//               className="w-full p-2 border rounded mb-2"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//             <button
//               type="submit"
//               className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Start Chat
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
