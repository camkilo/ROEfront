'use client';

import React from 'react';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white">
      {children}
    </div>
  );
}
