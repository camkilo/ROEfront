import { create } from "zustand";

type GameState = {
  player: string;
  inventory: string[];
  knownItems: string[];
  setInventory: (items: string[]) => void;
  setKnownItems: (items: string[]) => void;
};

export const useGameStore = create<GameState>((set) => ({
  player: "",
  inventory: [],
  knownItems: [],
  setInventory: (items) => set({ inventory: items }),
  setKnownItems: (items) => set({ knownItems: items }),
}));
