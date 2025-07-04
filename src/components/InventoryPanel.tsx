"use client";

import { useEffect } from "react";
import { fetchInventory } from "../../lib/api/player";
import { useGameStore } from "./store/GameStore";

export default function InventoryPanel({ player }: { player: string }) {
  const inventory = useGameStore((s) => s.inventory);
  const isLoading = useGameStore((s) => s.inventoryLoading);

  useEffect(() => {
    if (player) fetchInventory(player);
  }, [player]);

  const handleItemClick = (item: string) => {
    console.log("🧾 Clicked:", item);
    // Future: Open modal, detail view, use/scrap, etc.
  };

  return (
    <div className="bg-gray-900 border border-emerald-500 rounded-md p-4 shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-emerald-400 mb-3">🎒 Inventory</h2>

      {isLoading ? (
        <p className="text-gray-400">Loading inventory...</p>
      ) : inventory.length === 0 ? (
        <p className="text-gray-500 italic">Your bag is empty.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-2">
          {inventory.map((item, index) => (
            <li
              key={`${item}-${index}`}
              onClick={() => handleItemClick(item)}
              className="cursor-pointer px-3 py-2 bg-gray-800 hover:bg-emerald-700 rounded text-white text-sm font-medium transition"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
