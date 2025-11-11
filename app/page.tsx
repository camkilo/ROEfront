// app/page.tsx
'use client';

import GameDashboard from '@/src/components/Dashboard/GameDashboard';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <GameDashboard />
    </div>
  );
}
