import { FC, ReactNode } from "react";

import Navbar from "@/components/user-dashboard/dashboard/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="max-w-[1440px] mx-auto min-h-screen relative">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
