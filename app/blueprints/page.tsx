"use client";

import BlueprintPanel from "@/components/Blueprints/BlueprintPanel";
import AppShell from "@/components/Layout/AppShell";
import { useGameStore } from "@/components/store/GameStore";

export default function BlueprintPage() {
  const player = useGameStore((s) => s.player);

  return (
    <AppShell>
      <main className="min-h-screen p-10 bg-gradient-to-br from-black to-emerald-900">
<BlueprintPanel player={player ?? ""} />
      </main>
    </AppShell>
  );
}
