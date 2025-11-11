"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GameDashboard from "../src/components/Dashboard/GameDashboard";
import { useGameStore } from "../src/components/store/GameStore";

export default function Home() {
  const router = useRouter();
  const player = useGameStore((s) => s.player);
  const inventoryLoading = useGameStore((s) => s.inventoryLoading);

  useEffect(() => {
    // Redirect if no player and not loading
    if (!inventoryLoading && !player) {
      router.replace("/login");
    }
  }, [player, inventoryLoading, router]);

  if (inventoryLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl animate-pulse">
        ⏳ Loading your adventure data...
      </div>
    );
  }

  if (!player) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center text-white space-y-6">
        <h1 className="text-3xl font-bold">Realm of Echoes</h1>
        <p className="text-lg">🚪 Please log in or create a character to begin your journey.</p>
        <button
          onClick={() => router.push("/login")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <GameDashboard />
    </main>
  );
}
