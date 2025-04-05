
import React, { createContext, useState, useContext, ReactNode } from "react";
import { AdminUser } from "../types/visaTypes";
import { mockAdmins } from "../data/mockData";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const { toast } = useToast();

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple validation for demo
        if (email && password) {
          // Find user in mock data
          const foundUser = mockAdmins.find(admin => admin.email === email);
          
          if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('visaflow_auth', JSON.stringify({ userId: foundUser.id }));
            toast({
              title: "Login Successful",
              description: `Welcome back, ${foundUser.name}`,
              duration: 3000,
            });
            resolve(true);
          } else {
            toast({
              title: "Login Failed",
              description: "Invalid credentials. Please try again.",
              variant: "destructive",
              duration: 3000,
            });
            resolve(false);
          }
        } else {
          toast({
            title: "Login Failed",
            description: "Please enter both email and password.",
            variant: "destructive",
            duration: 3000,
          });
          resolve(false);
        }
      }, 1000); // Simulate network delay
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('visaflow_auth');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      duration: 3000,
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
