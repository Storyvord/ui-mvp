import ChatBody from "@/components/message/ChatBody";
import ChatHeader from "@/components/message/ChatHeader";
import ChatList from "@/components/message/ChatList";
import MessageInput from "@/components/message/MessageInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa";

export default function Component() {
  return (
    <div className="grid grid-cols-[300px_1fr] bg-white w-full mx-auto overflow-hidden border rounded-lg">
      <div className="bg-muted/20 p-4 border-r">
        <div className="flex items-center justify-between space-x-4">
          <div className="font-medium text-sm">Chats</div>
          <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
            <FaPlus className="h-4 w-4" />
            <span className="sr-only">New chat</span>
          </Button>
        </div>
        <div className="py-4">
          <Input placeholder="Search" className="h-8" />
        </div>
        <ChatList />
      </div>
      <div>
        <ChatHeader />
        <ChatBody />
        <MessageInput />
      </div>
    </div>
  );
}


// "use client";
// import { useWebSocket } from "@/hooks/useWebSocket";
// import { useState } from "react";

// export default function Chat() {
//   const [message, setMessage] = useState<string>("");
//   const { messages, sendMessage } = useWebSocket(
//     "wss://api-stage.storyvord.com:8001/ws/chat/3/?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI1Njk5MjMyLCJpYXQiOjE3MjU2MTI4MzIsImp0aSI6ImEzZjljMzAyOWUzYzQwNjM5N2RkZGY0YjA0NjM3YWM2IiwidXNlcl9pZCI6NX0.mWcAlhStFNIr_Fl4NTT07aeRR-QIX9mOm0dpJnnOfJQ"
//   );

//   const handleSendMessage = () => {
//     if (message.trim() !== "") {
//       sendMessage({ type: "message", content: message });
//       setMessage(""); // Clear input after sending
//     } else {
//       console.log("Message is empty. Cannot send.");
//     }
//   };
//   console.log(messages);
//   return (
//     <div>
//       <h1>Chat</h1>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type your message..."
//       />
//       <button onClick={handleSendMessage}>Send</button>
//       <div>
//         <h2>Messages</h2>
//         <ul>
//           {messages.map((msg, index) => (
//             <li key={index}>
//               <strong>{msg.type}:</strong> {msg.content}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
