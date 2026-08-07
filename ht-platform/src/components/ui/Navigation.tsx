'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from './Button';
import { UserMenu } from './UserMenu';
export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Giới thiệu', href: '/about' },
    { name: 'Dịch vụ', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Liên hệ', href: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${isScrolled ? 'bg-white/80 backdrop-blur-lg border-gray-100 shadow-sm py-3' : 'bg-white/0 border-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Image src="/logo_cropped.jpg" alt="H&T Logo" width={240} height={96} className="h-24 w-auto rounded-md object-contain" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-sm font-medium transition-colors ${isActive ? 'text-[#0D9488]' : 'text-gray-600 hover:text-[#0D9488]'}`}
                  >
                    {link.name}
                    <span className={`absolute left-0 bottom-[-4px] w-full h-[2px] bg-[#0D9488] rounded-full transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                  </Link>
                );
              })}
              <Link href="/quiz">
                <Button variant="primary" size="sm">Làm bài đánh giá</Button>
              </Link>
              <UserMenu />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-64 h-full bg-white shadow-2xl flex flex-col transform transition-transform animate-in slide-in-from-right duration-300">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <Image src="/logo_cropped.jpg" alt="H&T Logo" width={160} height={64} className="h-16 w-auto rounded-md object-contain" />
              <button
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-2 px-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive ? 'bg-[#0D9488]/10 text-[#0D9488]' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            <div className="p-4 border-t border-gray-100 space-y-4">
              <Link href="/quiz" onClick={() => setIsMobileMenuOpen(false)} className="block">
                <Button variant="primary" fullWidth>Làm bài đánh giá</Button>
              </Link>
              <div className="flex justify-center">
                <UserMenu />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
