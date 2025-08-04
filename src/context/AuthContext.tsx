import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of our user object
interface User {
  id: string;
  email: string;
  name: string;
}

// Define the shape of our auth context
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Initialize auth state from localStorage on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('auth-token');
    const storedUser = localStorage.getItem('auth-user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function - simulates API call
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login with dummy data
      const dummyToken = `dummy-token-${Date.now()}`;
      const dummyUser: User = {
        id: '1',
        email: email,
        name: email.split('@')[0], // Use email prefix as name
      };

      // Store in state
      setToken(dummyToken);
      setUser(dummyUser);

      // Persist in localStorage
      localStorage.setItem('auth-token', dummyToken);
      localStorage.setItem('auth-user', JSON.stringify(dummyUser));

      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  // Signup function - simulates API call
  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful signup with dummy data
      const dummyToken = `dummy-token-${Date.now()}`;
      const dummyUser: User = {
        id: '1',
        email: email,
        name: name,
      };

      // Store in state
      setToken(dummyToken);
      setUser(dummyUser);

      // Persist in localStorage
      localStorage.setItem('auth-token', dummyToken);
      localStorage.setItem('auth-user', JSON.stringify(dummyUser));

      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
  };

  // Check if user is authenticated
  const isAuthenticated = !!token && !!user;

  const value: AuthContextType = {
    user,
    token,
    login,
    signup,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};