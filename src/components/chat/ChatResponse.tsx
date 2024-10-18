import Loader from "@/components/Loader";
import { ChatTextResponse } from "./ChatTextResponse";
interface ChatResponseProps {
  data: ChatConversation;
  error: string;
  isLoading: boolean;
  showLoading?: boolean;
}

export const ChatResponse: React.FC<ChatResponseProps> = ({
  data,
  error,
  isLoading,
  showLoading,
}) => {
  return (
    <div className="flex w-10/12 ">
      <div className="grid place-items-center bg-gray-300 rounded-full mr-2 w-[3rem] h-[3rem] p-2"></div>

      {isLoading && showLoading && <Loader />}

      {data && (
        <div className="flex flex-col gap-2 w-full p-4 rounded-tl-none rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px] bg-gray-200 text-black">
          <ChatTextResponse data={data?.data} />
        </div>
      )}
    </div>
  );
};
