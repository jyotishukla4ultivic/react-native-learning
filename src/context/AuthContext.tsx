import React, { createContext, useState, useContext, ReactNode } from 'react';
import { endpoints } from '../services/api';
import { Alert, Platform } from 'react-native';

type User = {
  id?: string;
  name?: string;
  email: string;
  role: 'admin' | 'user';
  token?: string;
} | null;

interface AuthContextType {
  user: User;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(false);

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // For development, keep the hardcoded admin login
      if (email === 'admin' && password === 'admin123') {
        setUser({ email: 'admin', role: 'admin' });
        setIsLoading(false);
        return true;
      }

      const response = await fetch(endpoints.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser({ 
          email, 
          role: data.role || 'user', 
          token: data.token,
          name: data.name
        });
        return true;
      } else {
        showAlert('Login Failed', data.message || 'Invalid credentials');
        return false;
      }
    } catch (error) {
      console.error(error);
      showAlert('Error', 'Could not connect to the backend server. Is it running?');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(endpoints.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Automatically log them in after signup, or require them to login
        showAlert('Success', 'Account created successfully! You can now login.');
        return true;
      } else {
        showAlert('Signup Failed', data.message || 'Could not create account');
        return false;
      }
    } catch (error) {
      console.error(error);
      showAlert('Error', 'Could not connect to the backend server. Is it running?');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
