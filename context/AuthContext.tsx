import React, { createContext, useContext, useState, useEffect } from "react";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await SecureStore.getItemAsync("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Error checking auth state:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock user data - in real app, this would come from your backend
      const mockUser: User = {
        id: "1",
        email,
        name: "John Doe",
        phone: "+1234567890",
        bloodType: "A+",
        location: "New York, USA",
        isAvailable: true,
        donationsCount: 5,
        lastDonation: "2024-01-15",
      };

      setUser(mockUser);
      await SecureStore.setItemAsync("user", JSON.stringify(mockUser));
      router.replace("/(tabs)");
    } catch (error) {
      throw new Error("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: userData.email!,
        name: userData.name!,
        phone: userData.phone!,
        bloodType: userData.bloodType!,
        location: userData.location!,
        isAvailable: true,
        donationsCount: 0,
        dateOfBirth: userData.dateOfBirth,
      };

      setUser(newUser);
      await SecureStore.setItemAsync("user", JSON.stringify(newUser));
      router.replace("/(tabs)");
    } catch (error) {
      throw new Error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    await SecureStore.deleteItemAsync("user");
    router.replace("/(auth)/login");
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      SecureStore.setItemAsync("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
