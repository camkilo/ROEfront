"use client";

import XPDisplay from "@/components/XPDisplay";
import InventoryPanel from "@/components/InventoryPanel";
import GatheringPanel from "@/components/GatheringPanel";
import CraftingPanel from "@/components/CraftingPanel";
import BlueprintPanel from "@/components/BlueprintPanel";
import { useGameStore } from "@/store/gameStore";

export default function GameDashboard() {
  const player = useGameStore((s) => s.player);

  if (!player) {
    return (
      <div className="text-white text-center mt-10">
        <p className="text-xl">🚪 Please log in or create a character to play.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto text-white">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <XPDisplay player={player} />
        <InventoryPanel player={player} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GatheringPanel />
        <CraftingPanel />
      </div>

      <div>
        <BlueprintPanel />
      </div>
    </div>
  );
}
