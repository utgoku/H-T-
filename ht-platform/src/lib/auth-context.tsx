'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { TargetGoal, User, UserProfile, UserRole } from '@/types';

interface RegistrationResult {
  requiresEmailConfirmation: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<RegistrationResult>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function profileFromUser(authUser: SupabaseUser): UserProfile {
  const metadata = authUser.user_metadata || {};

  return {
    id: authUser.id,
    userId: authUser.id,
    fullName: metadata.full_name || metadata.fullName || authUser.email?.split('@')[0] || 'Thành viên PrymaLab',
    age: Number(metadata.age) || 25,
    gender: metadata.gender === 'MALE' || metadata.gender === 'FEMALE' ? metadata.gender : 'OTHER',
    weightKg: Number(metadata.weightKg) || 60,
    heightCm: Number(metadata.heightCm) || 170,
    targetGoal: Object.values(TargetGoal).includes(metadata.targetGoal) ? metadata.targetGoal : TargetGoal.GENERAL_WELLNESS,
  };
}

function userFromAuth(authUser: SupabaseUser): User {
  return {
    id: authUser.id,
    email: authUser.email || '',
    role: UserRole.CUSTOMER,
    createdAt: new Date(authUser.created_at),
  };
}

function authMessage(message: string): string {
  if (/invalid login credentials/i.test(message)) return 'Email hoặc mật khẩu chưa đúng.';
  if (/email not confirmed/i.test(message)) return 'Vui lòng xác nhận email trước khi đăng nhập.';
  if (/user already registered/i.test(message)) return 'Email này đã được đăng ký.';
  if (/password should be/i.test(message)) return 'Mật khẩu cần có ít nhất 6 ký tự.';
  return message;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const applyAuthUser = useCallback((authUser: SupabaseUser | null) => {
    setUser(authUser ? userFromAuth(authUser) : null);
    setProfile(authUser ? profileFromUser(authUser) : null);
  }, []);

  useEffect(() => {
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (active) {
        applyAuthUser(data.user);
        setIsLoading(false);
      }
    }).catch(() => {
      if (active) setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      applyAuthUser(session?.user || null);
      setIsLoading(false);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [applyAuthUser]);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setIsLoading(false);
    if (error) throw new Error(authMessage(error.message));
    applyAuthUser(data.user);
  }, [applyAuthUser]);

  const register = useCallback(async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login?verified=1`,
        data: { full_name: fullName.trim() },
      },
    });
    setIsLoading(false);
    if (error) throw new Error(authMessage(error.message));
    if (data.session?.user) applyAuthUser(data.session.user);
    return { requiresEmailConfirmation: !data.session };
  }, [applyAuthUser]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    applyAuthUser(null);
  }, [applyAuthUser]);

  const updateProfile = useCallback(async (data: Partial<UserProfile>) => {
    const nextProfile = profile ? { ...profile, ...data } : null;
    if (!nextProfile) return;

    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: nextProfile.fullName,
        age: nextProfile.age,
        gender: nextProfile.gender,
        weightKg: nextProfile.weightKg,
        heightCm: nextProfile.heightCm,
        targetGoal: nextProfile.targetGoal,
      },
    });
    if (error) throw new Error(authMessage(error.message));
    setProfile(nextProfile);
  }, [profile]);

  const value = useMemo(() => ({
    user,
    profile,
    isLoading,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    updateProfile,
  }), [user, profile, isLoading, login, register, logout, updateProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
