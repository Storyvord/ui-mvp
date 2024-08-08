import React from "react";
import Image from "next/image";

interface ChatbotQuestionsProps {
  // item: { question: string; type: "question" };
  item: any;
}

export const ChatbotQuestions: React.FC<ChatbotQuestionsProps> = ({ item }) => {
  console.log("item", item);
  return (
    <div className="flex justify-end gap-2 p-1 w-9/12 bg-white">
      <p className="bg-#292935 p-4 rounded-md">{item?.question}</p>
      {/* <div className="flex align-center justify-center p-2 rounded-md h-10 w-10 bg-white333333"> */}
      <Image
        src="/photo-1603415526960-f7e0328c63b1.avif"
        alt="Crew Profile"
        aria-expanded="true"
        aria-haspopup="dialog"
        className="inline-block relative object-cover object-center !rounded-full w-12 h-12 cursor-pointer"
        width={50}
        height={40}
        priority
        aria-controls=":r9:"
      />
      {/* </div> */}
    </div>
  );
};
