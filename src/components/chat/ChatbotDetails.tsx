// React
import { RefObject, useEffect, useRef, useState } from "react";
import { ChatResponse } from "./ChatResponse";
import { ChatbotQuestions } from "./ChatbotQuestions";
import { ChatbotSearch } from "./ChatbotSearch";
import { useChatMutation } from "@/lib/react-query/queriesAndMutations/chatbot";

const initialResponse = {
  data: "Hello! How can I assist you today with your film production needs? If you have specific details about your project, such as the type of shoot, location preferences, crew size, or equipment, please share, and I can provide tailored advice.",
};

export default function ChatbotDetails() {
  const [search, setSearch] = useState(""); // search chat
  const [conversation, setConversation] = useState<Array<Conversation>>([]);

  // Ref to scroll to bottom
  const messagesEndRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  // API for chat response
  const { mutateAsync: askQuestion, isLoading: chatIsLoading } = useChatMutation();

  // Filter the results based on search
  let filteredConversation: any[] = [];
  conversation.forEach((item: Conversation, index) => {
    if (search.length > 0 && item?.queryType === "question" && item?.data?.indexOf(search) > -1) {
      filteredConversation.push(index);
    }
    if (search.length === 0 && item?.queryType === "question") {
      filteredConversation.push(index);
    }
  });

  // Handle asking questions
  const handleQuestion = async (incomingQuestion: string) => {
    if (incomingQuestion) {
      // Append question into the conversation
      setConversation([...conversation, { queryType: "question", data: incomingQuestion }]);
      // Get response for the question
      const response = await askQuestion(incomingQuestion);
      // Append the answer into the conversation
      const { timestamp, ai_response } = response;
      setConversation([
        ...conversation,
        { queryType: "question", data: incomingQuestion },
        { queryType: "answer", data: ai_response, timestamp },
      ]);
    }
  };

  // Scroll to bottom of response
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [filteredConversation]);

  return (
    <div className="w-[40vw] bg-white rounded-t-sm border border-gray-400">
      <div>
        <div className="container h-[70vh] mt-4 p-4 mb-10 overflow-x-scroll">
          <ChatResponse data={initialResponse} isLoading={false} error={""} showLoading={false} />
          {filteredConversation?.map((item, key) => {
            return (
              <>
                <div className={`flex mt-4 justify-end key-question${key}`}>
                  <ChatbotQuestions item={conversation[item]} />
                </div>

                <div className={`mt-4 p-1 overflow-auto flex`} key={`answer${key}`}>
                  <ChatResponse
                    data={conversation[item + 1]}
                    isLoading={chatIsLoading}
                    error={""}
                    showLoading={key === filteredConversation.length - 1} //only show loading for latest question
                  />
                </div>
              </>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white w-full absolute bottom-0">
        <ChatbotSearch
          suggestedQueries={[]}
          handleQuestion={handleQuestion}
          isLoading={chatIsLoading}
        />
      </div>
    </div>
  );
}
