"use client";
import NavBar from "@/components/navbar/NavBar";
import SideBar from "@/components/sidebar/SideBar";
import { Toaster } from "@/components/ui/toaster";
import { FC, ReactNode, Suspense } from "react";

import Chatbot from "@/components/chat/Chatbot";
import ProjectContextProvider from "@/context/ProjectContext";
import SideBarContextProvider from "@/context/SideBarContext";
import UserContextProvider from "@/context/UserContext";
import Cookies from "js-cookie";
import Loading from "./loading";
import { useGetUserDetails } from "@/lib/react-query/queriesAndMutations/auth/auth";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const token = Cookies.get("accessToken");
  const { data: userDetails, isPending } = useGetUserDetails();

  return (
    <UserContextProvider>
      <div className="w-full min-h-screen bg-[#eceff180] relative">
        <SideBarContextProvider>
          <ProjectContextProvider>
            {userDetails && token && !isPending ? (
              <>
                <SideBar />
                <div className="lg:ml-72 font-sans">
                  <NavBar />
                  <Suspense fallback={<Loading />}>{children}</Suspense>
                </div>
                <Toaster />
                <Chatbot />
              </>
            ) : (
              <Loading />
            )}
          </ProjectContextProvider>
        </SideBarContextProvider>
      </div>
    </UserContextProvider>
  );
};

export default Layout;
