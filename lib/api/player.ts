import { useGameStore } from "@/store/gameStore";

// 🔁 Fetch inventory and known items, with optional loading state
export const fetchInventory = async (player: string) => {
  const set = useGameStore.getState();

  set.setInventoryLoading?.(true); // optional: set loading if defined

  try {
    const res = await fetch(`/api/inventory?player=${encodeURIComponent(player)}`);
    if (!res.ok) throw new Error(`Failed to fetch inventory: ${res.statusText}`);

    const data = await res.json();

    set.setInventory(data.inventory || []);
    set.setKnownItems(data.known_items || []);
  } catch (err) {
    console.error("❌ Error fetching inventory:", err);
  } finally {
    set.setInventoryLoading?.(false);
  }
};

// 🧪 Fetch XP and Level
export const fetchXP = async (player: string) => {
  const set = useGameStore.getState();

  try {
    const res = await fetch(`/api/xp?player=${encodeURIComponent(player)}`);
    if (!res.ok) throw new Error(`Failed to fetch XP: ${res.statusText}`);

    const data = await res.json();

    set.setXP(data.xp || 0);
    set.setLevel(data.level || 1);
  } catch (err) {
    console.error("❌ Error fetching XP:", err);
  }
};

// 📜 Fetch blueprints discovered by player
export const fetchBlueprints = async (player: string) => {
  const set = useGameStore.getState();

  try {
    const res = await fetch(`/api/blueprints?player=${encodeURIComponent(player)}`);
    if (!res.ok) throw new Error(`Failed to fetch blueprints: ${res.statusText}`);

    const data = await res.json();

    set.setBlueprints?.(data || {});
  } catch (err) {
    console.error("❌ Error fetching blueprints:", err);
  }
};

// 🏰 Fetch player faction and class info
export const fetchFactionClass = async (player: string) => {
  const set = useGameStore.getState();

  try {
    const res = await fetch(`/api/player_faction_class?player=${encodeURIComponent(player)}`);
    if (!res.ok) throw new Error(`Failed to fetch faction/class: ${res.statusText}`);

    const data = await res.json();

    set.setFaction?.(data.faction || null);
    set.setPlayerClass?.(data.player_class || null);
  } catch (err) {
    console.error("❌ Error fetching faction/class:", err);
  }
};
