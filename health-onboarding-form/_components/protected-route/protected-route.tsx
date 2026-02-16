"use client";

import { getCurrentUser, isAuthenticated } from "@/_actions/auth";
import { UserContext } from "@/_contexts/user-context";
import Link from "next/link";
import { ReactNode } from "react";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  if (!isAuthenticated()) {
    return <Link href="/login" />;
  }

  const user = getCurrentUser();

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
