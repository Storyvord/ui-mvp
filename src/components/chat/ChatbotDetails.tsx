// React
import { useEffect, useRef, useState } from "react";

import { ChatResponse } from "./ChatResponse";
import { ChatbotQuestions } from "./ChatbotQuestions";
import { ChatbotSearch } from "./ChatbotSearch";

export default function ChatbotDetails() {
  const [search, setSearch] = useState("");
  const [conversation, setConversation] = useState([
    { type: "question", question: "hello" },
    { type: "answer", data: "hi" },
  ]);
  const [questionCount, setQuestionCount] = useState(0);
  // Redux details
  // const params = useParams();

  // Filter the results based on search
  let filteredConversation: any[] = [];
  conversation.forEach((item: any, index) => {
    if (search.length > 0 && item?.type === "question" && item?.question?.indexOf(search) > -1) {
      filteredConversation.push(index);
    }
    if (search.length === 0 && item?.type === "question") {
      filteredConversation.push(index);
    }
  });

  const handleQuestion = (incomingQuestion: string) => {
    if (incomingQuestion) {
      // Increase the number of question in session
      setQuestionCount((prev) => prev + 1);
      //   Append question into the conversation
      setConversation([...conversation, { type: "question", question: incomingQuestion }]);
      //   Get response for the question
      // getResponse({
      //   tenantKey: userDetails.tenantKey,
      //   query: incomingQuestion,
      //   appName,
      //   incidentId: params?.incidentId,
      //   contextKey: initResponse?.data[1],
      // }).then((res) => {
      //   // Append the answer into the conversation
      //   setConversation([...conversation, { type: "question", question: incomingQuestion }, res]);
      // });
    }
  };

  //   //   Reset the chatbot
  //   const handleReset = () => {
  //     setConversation([]);
  //     setQuestionCount(0);
  //     filteredConversation = [];
  //     resetChatbot({
  //       userEmail: userDetails?.email,
  //       tenantKey: userDetails.tenantKey,
  //     });
  //   };

  const messagesEndRef = useRef<HTMLElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [filteredConversation]);
  return (
    <div className="relative h-[90vh]">
      <div className="col-span-1 bg-[#eceff180] rounded-t-xl">
        <div className="container mx-auto col-span-12 mt-4 p-4">
          {filteredConversation?.map((item, key) => {
            return (
              <>
                <div className={`flex mt-4 justify-end key-question${key}`}>
                  <ChatbotQuestions item={conversation[item]} />
                </div>

                <div className={`mt-4 p-1 overflow-auto flex`} key={`answer${key}`}>
                  <ChatResponse
                    data={conversation[item + 1]}
                    isLoading={false}
                    error={""}
                    showLoading={key === filteredConversation.length - 1}
                  />
                </div>
              </>
            );
          })}
          {/* <div ref={messagesEndRef} /> */}
        </div>
      </div>

      <div className="bg-white w-full absolute bottom-0">
        <ChatbotSearch suggestedQueries={[]} handleQuestion={handleQuestion} isLoading={false} />
      </div>
    </div>
  );
}
