import React from "react";
import { CgProfile } from "react-icons/cg";

interface ChatbotQuestionsProps {
  item: Conversation;
}

export const ChatbotQuestions: React.FC<ChatbotQuestionsProps> = ({ item }) => {
  return (
    <div className="flex align-middle justify-end gap-2 p-1 w-9/12 ">
      <p className="bg-#292935 p-4 rounded-md bg-gray-200">{item?.data}</p>
      <CgProfile className=" w-8 h-8" />
    </div>
  );
};
