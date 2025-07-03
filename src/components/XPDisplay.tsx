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
    <div>
      <p>Level: {level}</p>
      <p>XP: {xp}</p>
    </div>
  );
}
