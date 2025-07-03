import { create } from "zustand";

type GameState = {
  player: string | null;
  inventory: string[];
  knownItems: string[];
  xp: number;
  level: number;
  inventoryLoading: boolean;      // <-- added
  setPlayer: (player: string) => void;
  setInventory: (items: string[]) => void;
  setKnownItems: (items: string[]) => void;
  setXP: (xp: number) => void;
  setLevel: (lvl: number) => void;
  setInventoryLoading: (loading: boolean) => void;  // <-- added
};

export const useGameStore = create<GameState>((set) => ({
  player: null,
  inventory: [],
  knownItems: [],
  xp: 0,
  level: 1,
  inventoryLoading: false,  // <-- added initial state
  setPlayer: (player) => set({ player }),
  setInventory: (items) => set({ inventory: items }),
  setKnownItems: (items) => set({ knownItems: items }),
  setXP: (xp) => set({ xp }),
  setLevel: (level) => set({ level }),
  setInventoryLoading: (loading) => set({ inventoryLoading: loading }),  // <-- added setter
}));
