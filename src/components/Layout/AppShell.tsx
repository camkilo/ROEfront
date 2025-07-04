"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { usePlayerStore } from "@/store/usePlayerStore";

type Props = {
  children: ReactNode;
};

export default function AppShell({ children }: Props) {
  const pathname = usePathname();
  const player = usePlayerStore((s) => s.player);
  const inventory = usePlayerStore((s) => s.inventory);
  const xp = usePlayerStore((s) => s.xp);
  const level = usePlayerStore((s) => s.level);
  const zone = usePlayerStore((s) => s.zone);
  const faction = usePlayerStore((s) => s.faction);
  const classType = usePlayerStore((s) => s.classType);

  const isLoginPage = pathname.startsWith("/login");

  if (!player && !isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-center">
        🚪 Please log in or create a character to play.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white font-mono">
      {!isLoginPage && (
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
      )}

      <div className={isLoginPage ? "pt-10 px-4 sm:px-8" : "pt-20 px-4 sm:px-8"}>
        {children}
      </div>
    </div>
  );
}
