import React from 'react';

export const metadata = {
  title: 'Admin Dashboard | H&T Platform',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-inter">
      {children}
    </div>
  );
}
