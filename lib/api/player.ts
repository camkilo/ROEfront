import { useGameStore } from "@/store/gameStore";

// 🔁 Fetch inventory and known items
export const fetchInventory = async (player: string) => {
  const set = useGameStore.getState();

  set.setInventoryLoading(true); // optional: add loading state

  try {
    const res = await fetch(`/api/inventory?player=${encodeURIComponent(player)}`);
    const data = await res.json();

    set.setInventory(data.inventory || []);
    set.setKnownItems(data.known_items || []);
  } catch (err) {
    console.error("❌ Error fetching inventory:", err);
  } finally {
    set.setInventoryLoading(false); // optional
  }
};

// 🧪 Fetch XP and Level
export const fetchXP = async (player: string) => {
  const set = useGameStore.getState();

  try {
    const res = await fetch(`/api/xp?player=${encodeURIComponent(player)}`);
    const data = await res.json();

    set.setXP(data.xp || 0);
    set.setLevel(data.level || 1);
  } catch (err) {
    console.error("❌ Error fetching XP:", err);
  }
};
