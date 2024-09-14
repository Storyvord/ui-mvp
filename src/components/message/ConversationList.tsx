"use client";
import React from "react";
import Link from "next/link";

type User = {
  id: number;
  email: string;
  user_type: string; // Consider "crew" | "client" if these are the only values
  name: string | null; // Name can be null based on your data
  you: boolean;
};

type Conversation = {
  id: number;
  user1: User;
  user2: User;
};

const ConversationList: React.FC<{
  conversations: Conversation[] | undefined;
  senderId: number;
}> = ({ conversations = [], senderId }) => {
  // Filter conversations where the sender is involved
  const filteredConversations = conversations.filter(
    (convo) => convo.user1.id === senderId || convo.user2.id === senderId
  );

  // Get the name of the other participant
  const getOtherUserName = (convo: Conversation) => {
    if (convo.user1.id === senderId) {
      return { name: convo.user2.name || "Unnamed User", id: convo.user2.id };
    }
    return { name: convo.user1.name || "Unnamed User", id: convo.user1.id };
  };
  return (
    <div className="conversation-list p-4 overflow-y-auto flex flex-col gap-2">
      {filteredConversations.length > 0 ? (
        filteredConversations.map((convo) => {
          const { name, id } = getOtherUserName(convo);
          return (
            <Link
              href={`?receiverId=${id}&name=${name}`}
              key={convo.id}
              className="my-1 p-1 hover:bg-gray-100 cursor-pointer border-b"
            >
              {name}
            </Link>
          );
        })
      ) : (
        <p className="text-gray-500">No conversations available.</p>
      )}
    </div>
  );
};

export default ConversationList;
