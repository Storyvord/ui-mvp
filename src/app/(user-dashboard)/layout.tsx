"use client";
import NavBar from "@/components/navbar/NavBar";
import SideBar from "@/components/sidebar/SideBar";
import { Toaster } from "@/components/ui/toaster";
import { FC, ReactNode, Suspense, useState } from "react";
import creation from "@/assets/icons/creation";
import ChatbotDetails from "@/components/chat/ChatbotDetails";
import ProjectContextProvider from "@/context/ProjectContext";
import SideBarContextProvider from "@/context/SideBarContext";
import UserContextProvider from "@/context/UserContext";
import Loading from "./loading";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [openChat, setOpenChat] = useState(false);
  return (
    <UserContextProvider>
      <div className="w-full min-h-screen bg-[#eceff180] relative">
        <SideBarContextProvider>
          <ProjectContextProvider>
            <SideBar />
            <div className="lg:ml-72 font-sans">
              <NavBar />
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
            <Toaster />
            <button
              onClick={() => setOpenChat(!openChat)}
              className="fixed bottom-5 right-5 grid place-items-center bg-gradient-to-r from-[#1A68FF] to-[#009185] rounded-sm mr-2 w-[3rem] h-[3rem] p-1"
            >
              {creation}
            </button>
            {openChat && (
              <div className="fixed bottom-20 right-8 ">
                <ChatbotDetails />
              </div>
            )}
          </ProjectContextProvider>
        </SideBarContextProvider>
      </div>
    </UserContextProvider>
  );
};

export default Layout;
