// src/components/Layout/AppShell.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useGameStore } from "../store/GameStore";

type Props = {
  children: ReactNode;
};

export default function AppShell({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const player = useGameStore((s) => s.player);

  // If player is not set, redirect to login — BUT not if already there
  useEffect(() => {
    if (!player && pathname !== "/login") {
      router.push("/login");
    }
  }, [player, pathname]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-mono">
      {/* HUD only if logged in */}
      {player && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-sm p-4 flex justify-between items-center border-b border-zinc-800">
          <div className="space-x-4 text-sm text-emerald-300">
            <span>🧑 {player}</span>
          </div>
          <div className="text-sm text-amber-300 space-x-4">
            <span>🎒 Inventory HUD here</span>
          </div>
        </div>
      )}
      <div className="pt-20 px-4 sm:px-8">{children}</div>
    </div>
  );
}
