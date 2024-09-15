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
            retry(failureCount, error: any): any {
              if (error.status === 401) userLogout();
            },
          },
          mutations: {
            onSettled(data, error: any) {
              if (error.status === 401) userLogout();
            },
          },
        },
      })
  );
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
