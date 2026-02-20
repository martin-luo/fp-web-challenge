import { getCurrentUser, isAuthenticated } from "@/_actions/auth";
import { UserContextProvider } from "@/_contexts/user-context";
import Link from "next/link";
import { ReactNode } from "react";

export async function ProtectedRoute({ children }: { children: ReactNode }) {
  if (!(await isAuthenticated())) {
    return <Link href="/login">Login</Link>;
  }

  const user = await getCurrentUser();

  return <UserContextProvider user={user}>{children}</UserContextProvider>;
}
