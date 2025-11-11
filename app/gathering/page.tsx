"use client";
import GatheringPanel from "@/components/Gathering/GatheringPanel";
import AppShell from "@/components/Layout/AppShell";
import { usePlayerStore } from "@/components/store/usePlayerStore";

export default function GatheringPage() {
  const player = useGameStore((state) => state.player);

  return (
    <AppShell>
      <main className="min-h-screen p-10 bg-gradient-to-br from-black to-zinc-900">
        <GatheringPanel player={player ?? ""} />
      </main>
    </AppShell>
  );
}
