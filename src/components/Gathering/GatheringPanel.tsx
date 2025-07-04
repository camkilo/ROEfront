"use client";

import { useState } from "react";
import { useGameStore } from '../store/GameStore';

export default function GatheringPanel({ player }: { player: string }) {
  const [biome, setBiome] = useState("");
  const [gathered, setGathered] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const inventory = useGameStore((s) => s.inventory);
  const setInventory = useGameStore((s) => s.setInventory);

  const handleGather = async () => {
    if (!player || !biome) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/gather?player=${encodeURIComponent(player)}&biome=${encodeURIComponent(biome)}`);
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        setGathered(data.gathered);
        // Update global inventory state by merging new elements
        setInventory([...inventory, ...data.gathered]);
      }
    } catch (err) {
      console.error("Gather failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-indigo-600 rounded-md p-4 shadow-md max-w-md mx-auto my-6">
      <h2 className="text-xl font-bold text-indigo-400 mb-3">Gather Elements</h2>

      <label className="block mb-2 font-semibold text-gray-300" htmlFor="biome-select">Select Biome:</label>
      <select
        id="biome-select"
        className="w-full p-2 rounded bg-gray-800 text-white"
        value={biome}
        onChange={(e) => setBiome(e.target.value)}
      >
        <option value="">-- Choose a Biome --</option>
        <option value="Forest of Ember">Forest of Ember</option>
        <option value="Shattered Tundra">Shattered Tundra</option>
        <option value="Celestial Rift">Celestial Rift</option>
        {/* Extend with all your biomes here */}
      </select>

      <button
        onClick={handleGather}
        disabled={loading || !biome}
        className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 rounded"
      >
        {loading ? "Gathering..." : "Gather"}
      </button>

      {gathered.length > 0 && (
        <div className="mt-4 bg-gray-800 p-3 rounded">
          <h3 className="font-semibold text-indigo-300">Gathered Elements:</h3>
          <ul className="list-disc list-inside text-white">
            {gathered.map((el, i) => (
              <li key={i}>{el}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
