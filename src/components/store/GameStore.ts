import { create } from "zustand";

type GameState = {
  player: string | null;
  inventory: string[];
  knownItems: string[];
  xp: number;
  level: number;
  setPlayer: (player: string) => void;
  setInventory: (items: string[]) => void;
  setKnownItems: (items: string[]) => void;
  setXP: (xp: number) => void;
  setLevel: (lvl: number) => void;
};

export const useGameStore = create<GameState>((set) => ({
  player: null,
  inventory: [],
  knownItems: [],
  xp: 0,
  level: 1,
  setPlayer: (player) => set({ player }),
  setInventory: (items) => set({ inventory: items }),
  setKnownItems: (items) => set({ knownItems: items }),
  setXP: (xp) => set({ xp }),
  setLevel: (level) => set({ level }),
}));
