'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from './Button';
import { Badge } from './Badge';

export function UserMenu() {
  const { isAuthenticated, user, profile, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    router.push('/');
  };

  if (!isAuthenticated) {
    return (
      <Link href="/login">
        <Button variant="outline" size="sm">Đăng nhập</Button>
      </Link>
    );
  }

  const initials = profile?.fullName
    ? profile.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : user?.email.substring(0, 2).toUpperCase() || 'U';

  const roleName = user?.role === 'SUPER_ADMIN' ? 'Admin' :
                   user?.role === 'SPECIALIST' ? 'Chuyên gia' : 'Thành viên';

  const roleVariant = user?.role === 'SUPER_ADMIN' ? 'danger' :
                      user?.role === 'SPECIALIST' ? 'secondary' : 'primary';

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#0D9488] to-[#2563EB] text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D9488] transition-transform hover:scale-105"
      >
        {initials}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-4 border-b border-gray-50 bg-gray-50/50">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {profile?.fullName || user?.email}
            </p>
            <p className="text-xs text-gray-500 truncate mt-0.5">{user?.email}</p>
            <div className="mt-2">
              <Badge variant={roleVariant} size="sm">{roleName}</Badge>
            </div>
          </div>
          
          <div className="py-2">
            <Link 
              href="/dashboard"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0D9488] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              href="/dashboard/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0D9488] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Cài đặt
            </Link>
          </div>
          
          <div className="border-t border-gray-50 py-2">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
