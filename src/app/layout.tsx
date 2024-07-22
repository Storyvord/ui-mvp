"use client"
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "@/lib/react-query/ReactQueryClientProvider";
import { UserProvider } from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: '400',
subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: "Storyvord",
//   description: "",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
    <ReactQueryClientProvider>
        <html lang="en">
          <body className={roboto.className}>
              {children}
          </body>
        </html>
    </ReactQueryClientProvider>
    </UserProvider>
    
  );
}


