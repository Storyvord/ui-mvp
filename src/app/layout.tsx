import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "@/lib/react-query/ReactQueryClientProvider";
import UserContextProvider from "@/context/UserContext";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Storyvord",
  description: "WE HELP BRANDS AND FILMMAKERS TO SHOOT CONTENT WORLDWIDE",
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
          <body className={roboto.className}>
            {children}
            <Toaster />
          </body>
        </html>
      </ReactQueryClientProvider>
    </UserContextProvider>
  );
}
