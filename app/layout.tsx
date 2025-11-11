// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import AppShell from '@/components/Layout/AppShell';

export const metadata: Metadata = {
  title: 'Realm of Echoes',
  description: 'AI-powered MMORPG with player-made content, elemental crafting, and real-world rewards.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white font-sans antialiased scroll-smooth selection:bg-purple-500/30">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
