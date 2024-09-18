import { useState } from "react";
import sendFilled from "@/assets/icons/send-filled";

interface ChatbotSearchProps {
  suggestedQueries: string[];
  handleQuestion: (incomingQuestion: string) => void;
  isLoading: boolean;
}

export const ChatbotSearch: React.FC<ChatbotSearchProps> = ({
  suggestedQueries,
  handleQuestion,
  isLoading,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(""); //Current question

  // Send button disabled
  const disabled = currentQuestion.length === 0 || isLoading;

  // Handle submit
  const handleSubmit = () => {
    if (currentQuestion) {
      setCurrentQuestion("");
      handleQuestion(currentQuestion);
    }
  };
  return (
    <>
      <div className="flex gap-2 overflow-auto">
        {suggestedQueries?.map((item, key) => (
          <p
            key={key}
            className="border border-[color] p-2 rounded-full cursor-pointer max-w-max"
            onClick={() => handleQuestion(item)}
          >
            {item}
          </p>
        ))}
      </div>
      <div className="flex justify-between gap-4 items-center w-full border-2  border-blue-200">
        <input
          type="text"
          name="question"
          className="w-full p-2 focus:outline-none focus:ring-0"
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

        <button className="bg-blue-500 h-10 w-10" onClick={handleSubmit} disabled={disabled}>
          {sendFilled}
        </button>
      </div>
    </>
  );
};
