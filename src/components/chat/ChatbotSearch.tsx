import { FormEvent, useState } from "react";
import sendFilled from "@/assets/icons/send-filled";
import Image from "next/image";

interface ChatbotSearchProps {
  suggestedQueries: string[];
  isLoading: boolean;
  sendMessage: (incomingQuestion: string) => void;
}

export const ChatbotSearch: React.FC<ChatbotSearchProps> = ({
  suggestedQueries,
  isLoading,
  sendMessage,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(""); //Current question

  // Send button disabled
  const disabled = currentQuestion.length === 0 || isLoading;

  // Handle submit
  const handleSubmit = () => {
    if (currentQuestion) {
      setCurrentQuestion("");
      sendMessage(currentQuestion);
    }
  };
  return (
    <>
      {/* <div className="flex gap-2 overflow-auto">
        {suggestedQueries?.map((item, key) => (
          <p
            key={key}
            className="border border-[color] p-2 rounded-full cursor-pointer max-w-max"
            onClick={() => sendMessage(item)}
          >
            {item}
          </p>
        ))}
      </div> */}
      <div className="flex justify-between align-middle w-full bg-white p-2">
        <input
          type="text"
          name="question"
          className="w-full p-1 focus:outline-none"
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" && !disabled) {
              handleSubmit();
            }
          }}
          value={currentQuestion}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCurrentQuestion(e.target.value);
          }}
          placeholder="Type message here"
        />

        <button className="h-10 w-10" onClick={handleSubmit} disabled={disabled}>
          <Image className="w-[30px]" src={"/send.svg"} width={50} height={10} alt="" />
        </button>
      </div>
    </>
  );
};
