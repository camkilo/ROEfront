"use client";
import React, { useState, useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import { fetchBiomes, gatherElements } from "@/lib/api/gather";

export default function GatheringPanel() {
  const player = useGameStore((s) => s.player);
  const [biomes, setBiomes] = useState<string[]>([]);
  const [selectedBiome, setSelectedBiome] = useState<string | null>(null);
  const [gathered, setGathered] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      const biomeData = await fetchBiomes();
      setBiomes(Object.keys(biomeData));
    };
    load();
  }, []);

  const handleGather = async () => {
    if (!player || !selectedBiome) return;
    const result = await gatherElements(player, selectedBiome);
    setGathered(result.gathered || []);
    useGameStore.getState().setInventory(result.inventory);
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-lg shadow-xl text-white max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">🌿 Gathering Grounds</h2>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {biomes.map((b) => (
          <button
            key={b}
            onClick={() => setSelectedBiome(b)}
            className={`border px-3 py-1 rounded ${
              selectedBiome === b ? "bg-emerald-600 text-black" : "bg-zinc-800"
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      <button
        onClick={handleGather}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
      >
        Gather
      </button>

      {gathered.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">Collected:</h3>
          <p className="text-emerald-400">{gathered.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
