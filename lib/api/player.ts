import { useGameStore } from "@/store/gameStore";

export const fetchInventory = async (player: string) => {
  const res = await fetch(`/api/inventory?player=${player}`);
  const data = await res.json();
  useGameStore.getState().setInventory(data.inventory);
  useGameStore.getState().setKnownItems(data.known_items || []);
};

export const fetchXP = async (player: string) => {
  const res = await fetch(`/api/xp?player=${player}`);
  const data = await res.json();
  useGameStore.getState().setXP(data.xp || 0);
  useGameStore.getState().setLevel(data.level || 1);
};
