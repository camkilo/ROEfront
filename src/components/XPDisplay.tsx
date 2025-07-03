"use client";

import { useEffect } from "react";
import { fetchXP } from "@/lib/api/player";
import { useGameStore } from "@/store/gameStore";

export default function XPDisplay({ player }: { player: string }) {
  const xp = useGameStore((s) => s.xp);
  const level = useGameStore((s) => s.level);

  useEffect(() => {
    if (player) fetchXP(player);
  }, [player]);

  return (
    <div className="bg-zinc-900 text-white p-4 rounded shadow max-w-xs w-full">
      <h3 className="text-lg font-semibold text-emerald-400 mb-2">🧬 Player Progress</h3>
      <div className="text-sm space-y-1">
        <p>🎖️ <span className="text-amber-300">Level:</span> {level}</p>
        <p>📈 <span className="text-sky-300">XP:</span> {xp}</p>
      </div>
    </div>
  );
}
