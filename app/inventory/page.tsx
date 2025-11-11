"use client";
import AppShell from "@/components/Layout/AppShell";
import InventoryPanel from "@/components/InventoryPanel";
import { useGameStore } from "@/components/store/GameStore";

export default function InventoryPage() {
  const player = useGameStore((state) => state.player);

  if (!player) return null; // or a loading spinner/fallback

  return (
    <AppShell>
      <main className="min-h-screen p-10 bg-gradient-to-br from-black to-zinc-900">
        <InventoryPanel player={player} />
      </main>
    </AppShell>
  );
}
