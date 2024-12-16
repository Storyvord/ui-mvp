"use client";
import { FC, ReactNode, Suspense } from "react";
import Cookies from "js-cookie";

import UserContextProvider from "@/context/UserContext";
import { useGetUserProfile } from "@/lib/react-query/queriesAndMutations/auth/auth";

import Chatbot from "@/components/chat/Chatbot";
import { Toaster } from "@/components/ui/toaster";
import Loading from "../loading";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const token = Cookies.get("accessToken");
  const { data: userDetails, isPending } = useGetUserProfile();

  return (
    <UserContextProvider>
      <div className="w-full min-h-screen bg-[#eceff180] relative">
        {userDetails && token && !isPending ? (
          <>
            <div className="">
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
            <Toaster />
            <Chatbot />
          </>
        ) : (
          <Loading />
        )}
      </div>
    </UserContextProvider>
  );
};

export default Layout;
