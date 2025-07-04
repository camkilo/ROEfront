"use client";

import XPDisplay from "../components/XPDisplay";
import InventoryPanel from "../components/InventoryPanel";
import GatheringPanel from "../components/Gathering/GatheringPanel";
import CraftingPanel from "../components/Crafting/CraftingPanel";
import BlueprintPanel from "../components/Blueprints/BlueprintPanel";
import { useGameStore } from "../../components/store/gameStore";

export default function GameDashboard() {
  const player = useGameStore((s) => s.player);
  const inventoryLoading = useGameStore((s) => s.inventoryLoading);

  if (!player) {
    return (
      <div className="text-white text-center mt-10">
        <p className="text-xl">🚪 Please log in or create a character to play.</p>
      </div>
    );
  }

  if (inventoryLoading) {
    return (
      <div className="text-white text-center mt-10">
        <p className="text-xl animate-pulse">⏳ Loading your adventure data...</p>
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
        <GatheringPanel player={player} />
        <CraftingPanel player={player} />
      </div>

      <div>
        <BlueprintPanel player={player} />
      </div>
    </div>
  );
}
