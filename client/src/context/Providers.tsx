'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Theme Context
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

// Auth Context
interface User {
  id: string;
  email: string;
  name: string;
  branch: string;
  membershipType: 'basic' | 'premium';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// Providers Component
export function Providers({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleTheme = () => setIsDark(prev => !prev);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      id: '1',
      email,
      name: email.split('@')[0],
      branch: 'London Central',
      membershipType: 'basic',
    });
    setIsLoading(false);
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      id: '1',
      email,
      name,
      branch: 'London Central',
      membershipType: 'basic',
    });
    setIsLoading(false);
  };

  const logout = () => setUser(null);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
        {children}
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}