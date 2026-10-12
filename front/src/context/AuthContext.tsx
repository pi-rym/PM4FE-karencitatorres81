"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { LoginResponse } from "@/services/auth.service";

// Datos del usuario autenticado
export type AuthUser = LoginResponse["user"];

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  // Recuperar los datos al actualizar la página
  useEffect(() => {
    const checkSession = () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        try {
          const parsedUser: AuthUser = JSON.parse(storedUser);

          if (
            typeof parsedUser.id !== "number" ||
            typeof parsedUser.name !== "string" ||
            typeof parsedUser.email !== "string"
          ) {
            throw new Error("Datos de usuario inválidos");
          }

          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    };

    const timeoutId = window.setTimeout(checkSession, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  // Guardar la sesión y los datos del usuario
  const login = (token: string, userData: AuthUser) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
    setIsAuthenticated(true);
  };

  // Eliminar la sesión y los datos del usuario
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider");
  }

  return context;
}
