"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiRequest } from "@/lib/api";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: "admin" | "content" | "seo";
  permissions: {
    can_manage_users: boolean;
    can_manage_inquiries: boolean;
    can_manage_content: boolean;
    can_manage_seo: boolean;
  };
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuth = async () => {
    try {
      const storedToken = localStorage.getItem("smarttouch_token");
      if (!storedToken) {
        setUser(null);
        setToken(null);
        setIsLoading(false);
        return;
      }

      setToken(storedToken);
      const res = await apiRequest("/auth/me", {}, storedToken);
      if (res.success && res.user) {
        setUser(res.user);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      localStorage.removeItem("smarttouch_token");
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.success && res.token) {
      localStorage.setItem("smarttouch_token", res.token);
      setToken(res.token);
      setUser(res.user);
    } else {
      throw new Error(res.message || "Authentication failed");
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await apiRequest("/auth/logout", { method: "POST" }, token);
      }
    } catch (e) {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem("smarttouch_token");
      setUser(null);
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
