import { User } from "@/_actions/auth";
import React, { useContext } from "react";

type UserContextType = {
  id: string;
  email: string;
  name: string;
  membershipType: "basic" | "premium" | "elite";
  memberSince: string;
} | null;

export const UserContext = React.createContext<UserContextType>(null);

type UserContextProviderProps = {
  user: User | null;
  children: React.ReactNode;
};

export const UserContextProvider = ({
  user,
  children,
}: UserContextProviderProps) => {
  return (
    <UserContext.Provider
      value={{
        id: user?.id || "",
        email: user?.email || "",
        name: user?.name || "",
        membershipType: user?.membershipType || "basic",
        memberSince: user?.memberSince || "",
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
};
