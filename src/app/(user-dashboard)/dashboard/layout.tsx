import { FC, ReactNode } from "react";

import Navbar from "@/components/user-dashboard/dashboard/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="max-w-[2000px] mx-auto relative">
      <Navbar />
      <main className=" relative pt-16 ">{children}</main>
    </div>
  );
};

export default Layout;
