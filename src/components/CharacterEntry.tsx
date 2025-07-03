"use client";
import React, { useState } from "react";
import { useGameStore } from "@/store/gameStore";
import {
  fetchInventory,
  fetchXP,
  fetchBlueprints,
  fetchFactionClass,
} from "@/lib/api/player";

export default function CharacterEntry({
  onEnter,
}: {
  onEnter?: (playerName: string) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const setPlayer = useGameStore((s) => s.setPlayer);

  const handleStart = async () => {
    if (!name.trim()) {
      setError("Enter a valid name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Check if player exists
      const checkRes = await fetch(`/api/users?name=${encodeURIComponent(name)}`);
      const checkData = await checkRes.json();

      if (!checkData.exists) {
        // Create new player
        const createRes = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });
        const createData = await createRes.json();

        if (!createRes.ok) throw new Error(createData.error || "Error creating player.");
      }

      // Set player in Zustand store
      setPlayer(name);

      // Fully hydrate player state before proceeding
      await fetchInventory(name);
      await fetchXP(name);
      await fetchBlueprints(name);
      await fetchFactionClass(name);

      // Optional callback for parent components
      if (onEnter) await onEnter(name);

    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black to-zinc-900 text-white px-4">
      <div className="bg-zinc-800 p-6 rounded-lg shadow-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">🌌 Realm of Echoes</h1>
        <p className="text-zinc-400 mb-6">Enter your adventurer name to begin:</p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Alchemist42"
          className="w-full px-4 py-2 mb-4 rounded bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          disabled={loading}
          autoFocus
        />

        <button
          onClick={handleStart}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded w-full"
        >
          {loading ? "Starting..." : "Enter Realm"}
        </button>

        {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}
      </div>
    </div>
  );
}
