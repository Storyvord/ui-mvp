// React
import { useState } from "react";
// Material ui
// Others
import sendFilled from "@/assets/icons/send-filled";

interface ChatbotSearchProps {
  suggestedQueries: string[];
  handleQuestion: (question: any) => void;
  isLoading: boolean;
  title?: string; // `?` makes the title optional
}

export const ChatbotSearch: React.FC<ChatbotSearchProps> = ({
  suggestedQueries,
  handleQuestion,
  isLoading,
  title,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState("");

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
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          value={currentQuestion}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCurrentQuestion(e.target.value);
          }}
          placeholder="Type message here"
        />

        <button className="bg-blue-400 h-10" onClick={handleSubmit} disabled={isLoading}>
          {sendFilled}
        </button>
      </div>
    </>
  );
};
