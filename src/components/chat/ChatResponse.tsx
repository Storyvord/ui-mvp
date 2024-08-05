import creation from "@/assets/icons/creation";
import { ChatTextResponse } from "./ChatTextResponse";

interface ChatResponseProps {
  data: any;
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
    <div className="flex w-9/12 bg-white">
      <div className="grid place-items-center bg-gradient-to-r from-[#1A68FF] to-[#009185] rounded-sm mr-2 w-[3rem] h-[3rem] p-1">
        {creation}
      </div>

      {/* {isLoading && showLoading && <CircularProgress color="secondary" />} */}

      {data && (
        <div className="flex flex-col gap-2 w-full px-4 rounded-md">
          <ChatTextResponse data={data?.data} />
        </div>
      )}
    </div>
  );
};
