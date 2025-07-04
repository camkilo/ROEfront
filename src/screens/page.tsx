"use client";

import React, { useState } from "react";
import CharacterEntry from "@/components/CharacterEntry";
import GameDashboard from "@/components/GameDashboard";
import { useGameStore } from "@/store/gameStore";

export default function AppRoot() {
  const player = useGameStore((s) => s.player);
  const [loading, setLoading] = useState(false);
  const [entryError, setEntryError] = useState<string | null>(null);

  // Called when player successfully enters name
  const handleEnter = async (playerName: string) => {
    setLoading(true);
    setEntryError(null);
    try {
      // Could do extra async setup here if needed
      // For now just a pause simulating load:
      await new Promise((r) => setTimeout(r, 300));
    } catch (e: any) {
      setEntryError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-xl">
        Loading your adventure...
      </div>
    );
  }

  if (!player) {
    return <CharacterEntry onEnter={handleEnter} />;
  }

  return (
    <>
      {entryError && (
        <div className="bg-red-600 text-white p-2 text-center">
          Error: {entryError}
        </div>
      )}
      <GameDashboard />
    </>
  );
}
