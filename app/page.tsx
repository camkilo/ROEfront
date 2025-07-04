// src/app/page.tsx
'use client';

import GameDashboard from '@/components/GameDashboard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <GameDashboard />
    </div>
  );
}
