import { useEffect } from "react";
import { fetchInventory } from "@/lib/api/player";
import { useGameStore } from "@/store/gameStore";

export default function InventoryPanel({ player }: { player: string }) {
  const inventory = useGameStore((s) => s.inventory);

  useEffect(() => {
    if (player) fetchInventory(player);
  }, [player]);

  return (
    <div>
      <h2>Inventory</h2>
      <ul>
        {inventory.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
