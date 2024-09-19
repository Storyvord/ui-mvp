import creation from "@/assets/icons/creation";
import { ChatTextResponse } from "./ChatTextResponse";
import Loader from "@/components/Loader";
interface ChatResponseProps {
  data: Conversation;
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
    <div className="flex w-10/12 bg-white">
      <div className="grid place-items-center bg-gradient-to-r from-[#1A68FF] to-[#009185] rounded-sm mr-2 w-[3rem] h-[3rem] p-2">
        {creation}
      </div>

      {isLoading && showLoading && <Loader />}

      {data && (
        <div className="flex flex-col gap-2 w-full p-4 rounded-md bg-gray-200">
          <ChatTextResponse data={data?.data} />
        </div>
      )}
    </div>
  );
};
