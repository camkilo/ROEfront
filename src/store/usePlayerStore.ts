import { create } from "zustand";

interface PlayerState {
  player: string;
  inventory: string[];
  knownItems: string[];
  xp: number;
  level: number;
  zone: string;
  faction: string;
  classType: string;

  setPlayer: (name: string) => void;
  setInventory: (inv: string[]) => void;
  setKnownItems: (items: string[]) => void;
  setXP: (xp: number) => void;
  setLevel: (lvl: number) => void;
  setZone: (zone: string) => void;
  setFaction: (name: string) => void;
  setClassType: (type: string) => void;
  addToInventory: (item: string) => void;
  removeFromInventory: (item: string) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  player: "",
  inventory: [],
  knownItems: [],
  xp: 0,
  level: 1,
  zone: "",
  faction: "",
  classType: "",

  setPlayer: (name) => set({ player: name }),
  setInventory: (inv) => set({ inventory: inv }),
  setKnownItems: (items) => set({ knownItems: items }),
  setXP: (xp) => set({ xp }),
  setLevel: (lvl) => set({ level: lvl }),
  setZone: (zone) => set({ zone }),
  setFaction: (name) => set({ faction: name }),
  setClassType: (type) => set({ classType: type }),
  addToInventory: (item) =>
    set((state) => ({ inventory: [...state.inventory, item] })),
  removeFromInventory: (item) =>
    set((state) => ({
      inventory: state.inventory.filter((i) => i !== item),
    })),
}));
