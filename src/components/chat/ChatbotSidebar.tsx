import React, { Key } from "react";
import { format } from "date-fns";

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
  console.log(data);
  return (
    <div className="flex flex-col gap-2 bg-white ">
      {data?.map((item: Session, key: Key) => (
        <div className="bg-gray-50 p-3" key={key}>
          <p
            className="font-bold cursor-pointer"
            onClick={() => {
              setCurrentSession({ id: 2, session_id: "eaa1fce4-a427-4605-aa21-cbdb4e84b755" });
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
