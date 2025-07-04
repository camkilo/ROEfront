"use client";

import { useGameStore } from "@/store/gameStore";

export default function PlayerProgress() {
  const xp = useGameStore((s) => s.xp);
  const level = useGameStore((s) => s.level);

  // Scalable XP curve (adjustable for game balance)
  const xpForNextLevel = Math.floor(100 * Math.pow(1.5, level - 1));
  const progressPercent = Math.min((xp / xpForNextLevel) * 100, 100);

  return (
    <div className="bg-indigo-950 border border-indigo-600 rounded-lg p-4 shadow-lg w-full max-w-md mx-auto text-white">
      <h2 className="text-xl font-bold text-indigo-300 mb-3">📈 Player Progress</h2>

      <p className="mb-2 text-lg">
        Level: <span className="font-bold text-indigo-400">{level}</span>
      </p>

      <div className="w-full bg-zinc-800 rounded-full h-5 overflow-hidden">
        <div
          className="bg-indigo-500 h-5 transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
          aria-label={`XP progress: ${Math.floor(progressPercent)}%`}
        />
      </div>

      <p className="mt-2 text-sm text-indigo-300">
        XP: {xp} / {xpForNextLevel}
      </p>
    </div>
  );
}
