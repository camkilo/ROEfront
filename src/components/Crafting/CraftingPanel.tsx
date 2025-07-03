"use client";
import React, { useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { craftItem } from "@/lib/api/craft";

export default function CraftingPanel() {
  const player = useGameStore((s) => s.player);
  const inventory = useGameStore((s) => s.inventory);
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const toggleSelect = (el: string) => {
    setSelected((prev) =>
      prev.includes(el)
        ? prev.filter((e) => e !== el)
        : [...prev, el]
    );
  };

  const handleCraft = async () => {
    if (!player || selected.length === 0) return;
    const res = await craftItem(player, selected);
    setResult(res?.crafted_item || "Crafting failed");
    setSelected([]);
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-lg shadow-xl w-full max-w-2xl mx-auto text-white">
      <h2 className="text-xl font-bold mb-4">🧪 Crafting Altar</h2>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {inventory.map((el, i) => (
          <button
            key={`${el}-${i}`}
            onClick={() => toggleSelect(el)}
            className={`border rounded px-2 py-1 text-sm ${
              selected.includes(el)
                ? "bg-green-500 text-black"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            {el}
          </button>
        ))}
      </div>

      <button
        onClick={handleCraft}
        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded mb-4"
      >
        Craft
      </button>

      {result && (
        <div className="text-center mt-4">
          <p className="text-lg font-bold text-emerald-400">
            ⚒️ Crafted: {result}
          </p>
        </div>
      )}
    </div>
  );
}
