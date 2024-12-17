"use client";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";

type ChatHeaderProps = {
  receiverName: string;
  isReceiverOnline: boolean;
  onMenuClick: () => void;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({ receiverName, isReceiverOnline, onMenuClick }) => {
  return (
    <div className="relative pb-2 bg-white p-3">
      <RxHamburgerMenu
        onClick={onMenuClick}
        className="w-6 h-6 sm:hidden block absolute cursor-pointer"
      />
      <div className=" flex items-center p-2">
        <CgProfile className=" w-8 h-8" />
        <h1 className="w-full pl-8 sm:pl-2 font-poppins-semibold text-lg flex items-center gap-2">
          {receiverName}
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              isReceiverOnline ? "bg-green-500" : "bg-gray-400"
            }`}
          ></span>
        </h1>
      </div>
    </div>
  );
};

export default ChatHeader;
