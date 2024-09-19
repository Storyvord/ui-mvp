"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { userLogout } from "../api/auth/auth";

export const ReactQueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60000,
            retry(failureCount: number, error: any): boolean {
              if (error?.status === 401) {
                userLogout();
                return false;
              }
              return failureCount <= 1;
            },
          },
          mutations: {
            onSettled(data: any, error: any) {
              if (error?.status === 401) userLogout();
            },
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
