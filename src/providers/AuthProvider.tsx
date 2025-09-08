"use client";

import { useAuth } from "@/features/auth/hooks/useAuthStore";
import { AuthService } from "@/lib/auth";
import { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser } = useAuth();
  useEffect(() => {
    const unsubscribe = AuthService.onAuthChange((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [setUser]);
  return children;
}
