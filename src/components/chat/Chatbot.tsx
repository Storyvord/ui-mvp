"use client";
import creation from "@/assets/icons/creation";
import { useState } from "react";
import { ChatbotDetails } from "./ChatbotDetails";

export default function Chatbot() {
  const [openChat, setOpenChat] = useState(false); //open or close modal
  const [conversation, setConversation] = useState<Array<Conversation>>([]); //store conversation
  return (
    <>
      <button
        onClick={() => setOpenChat(!openChat)}
        className="fixed bottom-5 right-5 grid place-items-center bg-gradient-to-r from-[#1A68FF] to-[#009185] rounded-sm mr-2 w-[3rem] h-[3rem] p-1"
      >
        {creation}
      </button>
      {openChat && (
        <div className="fixed bottom-20 right-8 ">
          <ChatbotDetails conversation={conversation} setConversation={setConversation} />
        </div>
      )}
    </>
  );
}
