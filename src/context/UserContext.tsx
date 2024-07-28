'use client'

import { getUserDetails } from "@/lib/api/api";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserDetails {
  id: number;
  username: string;
  email: string;
  // Add other user details as needed
}

interface UserContextProps {
  userDetails: UserDetails | null;
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetails | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

 const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserContextProvider
