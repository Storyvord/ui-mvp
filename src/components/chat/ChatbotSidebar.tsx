import { format } from "date-fns/format";
import React, { Key } from "react";

interface ChatbotSidebarProps {
  data: Session[];
  setCurrentSession: React.Dispatch<React.SetStateAction<Session | undefined>>;
  setOpenHistory: React.Dispatch<React.SetStateAction<Boolean>>;
  expanded: Boolean;
}

export const ChatbotSidebar: React.FC<ChatbotSidebarProps> = ({
  data,
  setCurrentSession,
  setOpenHistory,
  expanded,
}) => {
  return (
    <div className="flex flex-col gap-2 bg-white ">
      {data?.map((item: Session, key: Key) => (
        <div className="bg-gray-50 p-3" key={key}>
          <p
            className="font-bold cursor-pointer"
            onClick={() => {
              setCurrentSession({ id: 2, session_id: item.session_id });
              !expanded && setOpenHistory(false);
            }}
          >
            Chat On
          </p>
          <p>{format(new Date(item.created_at as string), "dd-MM-yyyy")}</p>
        </div>
      ))}
    </div>
  );
};
