import DashboardNavbar from "@/components/user-dashboard/dashboard/DashboardNavbar";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="max-w-[2000px] mx-auto relative">
      <DashboardNavbar />
      <main className=" relative pt-16 ">{children}</main>
    </div>
  );
};

export default Layout;
