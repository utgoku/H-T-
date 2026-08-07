'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, UserProfile, TargetGoal } from '@/types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<void>;
  register: (email: string, password?: string, fullName?: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hydrate state from localStorage
    try {
      const storedUser = localStorage.getItem('ht_user');
      const storedProfile = localStorage.getItem('ht_profile');
      
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    } catch (error) {
      console.error('Failed to parse auth data from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    // Simulate 500ms delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Validate email
    if (!email || !email.includes('@')) {
      setIsLoading(false);
      throw new Error('Email không hợp lệ');
    }

    let role = UserRole.CUSTOMER;
    if (email === 'admin@htplatform.vn') {
      role = UserRole.SUPER_ADMIN;
    } else if (email === 'specialist@htplatform.vn') {
      role = UserRole.SPECIALIST;
    }

    const mockUser: User = {
      id: crypto.randomUUID(),
      email,
      role,
      createdAt: new Date(),
    };

    const mockProfile: UserProfile = {
      id: crypto.randomUUID(),
      userId: mockUser.id,
      fullName: email.split('@')[0],
      age: 25,
      gender: 'OTHER',
      weightKg: 60,
      heightCm: 170,
      targetGoal: TargetGoal.GENERAL_WELLNESS,
    };

    setUser(mockUser);
    setProfile(mockProfile);
    
    localStorage.setItem('ht_user', JSON.stringify(mockUser));
    localStorage.setItem('ht_profile', JSON.stringify(mockProfile));
    
    setIsLoading(false);
  };

  const register = async (email: string, password?: string, fullName?: string) => {
    setIsLoading(true);
    // Simulate 500ms delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!email || !email.includes('@')) {
      setIsLoading(false);
      throw new Error('Email không hợp lệ');
    }

    const mockUser: User = {
      id: crypto.randomUUID(),
      email,
      role: UserRole.CUSTOMER,
      createdAt: new Date(),
    };

    const mockProfile: UserProfile = {
      id: crypto.randomUUID(),
      userId: mockUser.id,
      fullName: fullName || email.split('@')[0],
      age: 25,
      gender: 'OTHER',
      weightKg: 60,
      heightCm: 170,
      targetGoal: TargetGoal.GENERAL_WELLNESS,
    };

    setUser(mockUser);
    setProfile(mockProfile);
    
    localStorage.setItem('ht_user', JSON.stringify(mockUser));
    localStorage.setItem('ht_profile', JSON.stringify(mockProfile));
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('ht_user');
    localStorage.removeItem('ht_profile');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!profile) return;
    const updatedProfile = { ...profile, ...data };
    setProfile(updatedProfile);
    localStorage.setItem('ht_profile', JSON.stringify(updatedProfile));
  };

  const value = {
    user,
    profile,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
