"use client";
import { ReactNode, useEffect } from "react";
import { useGameStore } from "../store/GameStore";

type Props = {
  children: ReactNode;
};

export default function AppShell({ children }: Props) {
  const player = useGameStore((s) => s.player);
  const inventory = useGameStore((s) => s.inventory);
  const xp = useGameStore((s) => s.xp);
  const level = useGameStore((s) => s.level);
  const zone = useGameStore((s) => s.zone);
  const faction = useGameStore((s) => s.faction);
  const classType = useGameStore((s) => s.classType);

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white font-mono">
      {/* Global HUD */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-sm p-4 flex justify-between items-center border-b border-zinc-800">
        <div className="space-x-4 text-sm text-emerald-300">
          <span>🧑 {player || "Guest"}</span>
          <span>🎖️ XP: {xp} | Level {level}</span>
          <span>🛡️ {classType || "Classless"} | 🏰 {faction || "No Faction"}</span>
        </div>
        <div className="text-sm text-amber-300 space-x-4">
          <span>🏞️ {zone || "Unknown Zone"}</span>
          <span>🎒 {inventory.length} items</span>
        </div>
      </div>

      {/* Content below HUD */}
      <div className="pt-20 px-4 sm:px-8">{children}</div>
    </div>
  );
}
