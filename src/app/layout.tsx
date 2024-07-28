import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "@/lib/react-query/ReactQueryClientProvider";
import UserContextProvider from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: '400',
subsets: ['latin'] });

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
          <body className={roboto.className}>
              {children}
          </body>
        </html>
    </ReactQueryClientProvider>
    </UserContextProvider>
    
  );
}


