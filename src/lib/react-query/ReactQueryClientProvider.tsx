"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { getNewAccessToken, userLogout } from "../api/auth/auth";
import Cookies from "js-cookie";

export const ReactQueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  const handleTokenError = async () => {
    try {
      const res = await getNewAccessToken();
      Cookies.set("accessToken", res.access);
      return true; // Indicate success
    } catch (error) {
      console.error("Token refresh failed:", error);
      userLogout(); // Logout on failure
      return false; // Indicate failure
    }
  };

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60000,
            retry: (failureCount: number, error: any): boolean => {
              if (error?.status === 401) {
                handleTokenError();
                return false; // Prevent immediate retry; token handling is async
              }
              return failureCount <= 1; // Retry once for other errors
            },
          },
          mutations: {
            onSettled: async (data: any, error: any) => {
              if (error?.status === 401) {
                await handleTokenError(); // Handle token error in mutations
              }
            },
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
