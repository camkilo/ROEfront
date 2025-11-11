"use client";

import CraftingPanel from "@/components/Crafting/CraftingPanel";
import AppShell from "@/components/Layout/AppShell";
import { usePlayerStore } from "@/components/store/usePlayerStore";

export default function CraftingPage() {
  const player = useGameStore((s) => s.player);

  return (
    <AppShell>
      <main className="min-h-screen p-10 bg-gradient-to-br from-zinc-900 to-zinc-800">
<CraftingPanel player={player ?? ""} />
      </main>
    </AppShell>
  );
}
