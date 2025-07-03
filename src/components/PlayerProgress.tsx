"use client";
import React from "react";
import { useGameStore } from "@/store/gameStore";

export default function PlayerProgress() {
  const xp = useGameStore((s) => s.xp);
  const level = useGameStore((s) => s.level);

  // Define XP needed for next level with a scalable formula
  const xpForNextLevel = Math.floor(100 * Math.pow(1.5, level - 1));
  const progressPercent = Math.min((xp / xpForNextLevel) * 100, 100);

  return (
    <div className="bg-indigo-900 p-4 rounded-lg shadow-md max-w-md mx-auto text-white">
      <h2 className="text-2xl font-bold mb-2">Player Progress</h2>

      <p className="text-lg mb-1">Level: <span className="font-semibold">{level}</span></p>

      <div className="w-full bg-gray-700 rounded-full h-6">
        <div
          className="bg-indigo-500 h-6 rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
          aria-label={`XP progress: ${Math.floor(progressPercent)}%`}
        />
      </div>

      <p className="mt-1 text-sm text-indigo-300">
        XP: {xp} / {xpForNextLevel}
      </p>
    </div>
  );
}
