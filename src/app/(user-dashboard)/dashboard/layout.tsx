import { FC, ReactNode } from "react";

import NavBar from "@/components/navbar/NavBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-[#eceff180] relative">
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
