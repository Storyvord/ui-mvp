// React
import { RefObject, useEffect, useRef, useState } from "react";
import { ChatResponse } from "./ChatResponse";
import { ChatbotQuestions } from "./ChatbotQuestions";
import { ChatbotSearch } from "./ChatbotSearch";
import Image from "next/image";

interface ChatbotDetailsProps {
  conversation: Array<Conversation> | [];
  sendMessage: (incomingQuestion: string) => void;
}

const initialResponse = {
  data: "Hello! How can I assist you today with your film production needs? If you have specific details about your project, such as the type of shoot, location preferences, crew size, or equipment, please share, and I can provide tailored advice.",
};

export const ChatbotDetails: React.FC<ChatbotDetailsProps> = ({ conversation, sendMessage }) => {
  const [search, setSearch] = useState(""); // search chat
  const [expanded, setExpanded] = useState(false);
  // Ref to scroll to bottom
  const messagesEndRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  // Filter the results based on search
  let filteredConversation: Array<number> = [];
  conversation.forEach((item: Conversation, index) => {
    if (search.length > 0 && item?.queryType === "question" && item?.data?.indexOf(search) > -1) {
      filteredConversation.push(index);
    }
    if (search.length === 0 && item?.queryType === "question") {
      filteredConversation.push(index);
    }
  });

  // Scroll to bottom of response
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [filteredConversation]);

  return (
    <div
      className={
        expanded
          ? "fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  flex flex-col w-[70vw] h-[80vh] rounded-lg bg-white overflow-hidden border border-gray-300"
          : "flex flex-col w-[30vw] h-[70vh] rounded-lg bg-white overflow-hidden border border-gray-300"
      }
    >
      <div className="flex align-middle justify-between  mx-2 pt-4">
        <Image className="w-[150px]" src="/storyvord-ai.svg" width={100} height={10} alt="" />
        <button onClick={() => setExpanded(!expanded)}>
          <Image className="w-[30px]" src={"/circle-expand.svg"} width={50} height={10} alt="" />
        </button>
      </div>
      <div className="p-3 overflow-x-hidden bg-gray-100">
        <ChatResponse data={initialResponse} isLoading={false} error={""} showLoading={false} />
        {filteredConversation?.map((item, key) => {
          return (
            <>
              <div className={`flex mt-4 justify-end`}>
                <ChatbotQuestions item={conversation[item]} />
              </div>

              <div className={`flex mt-4`} key={`answer${key}`}>
                <ChatResponse
                  data={conversation[item + 1]}
                  isLoading={!conversation[item + 1]}
                  error={""}
                  showLoading={key === filteredConversation.length - 1} //only show loading for latest question
                />
              </div>
            </>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div>
        <ChatbotSearch suggestedQueries={[]} isLoading={false} sendMessage={sendMessage} />
      </div>
    </div>
  );
};
