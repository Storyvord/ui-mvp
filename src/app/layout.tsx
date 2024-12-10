import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "@/lib/react-query/ReactQueryClientProvider";
import UserContextProvider from "@/context/UserContext";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Storyvord",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserContextProvider>
      <ReactQueryClientProvider>
        <html lang="en">
          <body className=" font-poppins">
            {children}
            <Toaster />
          </body>
        </html>
      </ReactQueryClientProvider>
    </UserContextProvider>
  );
}
