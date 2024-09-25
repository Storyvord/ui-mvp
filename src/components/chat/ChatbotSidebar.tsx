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
              setCurrentSession(item);
              !expanded && setOpenHistory(false);
            }}
          >
            Topic
          </p>
          <p>{item.session_id}</p>
        </div>
      ))}
    </div>
  );
};
