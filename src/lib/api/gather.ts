import { useGameStore } from "../../components/store/GameStore";

export const gatherFromBiome = async (player: string, biome: string) => {
  const res = await fetch(`/api/gather?player=${player}&biome=${biome}`);
  const data = await res.json();

  if (data.inventory) {
    useGameStore.getState().setInventory(data.inventory);
  }

  return data;
};
