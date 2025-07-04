import { useGameStore } from "../../../store/gameStore";

export const craftItem = async (player: string, elements: string[]) => {
  const res = await fetch("/api/craft", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ player, elements }),
  });

  const data = await res.json();

  if (data.inventory) {
    useGameStore.getState().setInventory(data.inventory);
  }
  if (data.new_item && data.crafted_item) {
    const currentKnown = useGameStore.getState().knownItems;
    if (!currentKnown.includes(data.crafted_item)) {
      useGameStore.getState().setKnownItems([...currentKnown, data.crafted_item]);
    }
  }

  return data;
};
