import React from 'react';

export const metadata = {
  title: 'Admin Dashboard | PrymaLab',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-inter">
      {children}
    </div>
  );
}
