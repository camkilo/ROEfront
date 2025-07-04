import { create } from "zustand";

type GameState = {
  player: string | null;
  inventory: string[];
  knownItems: string[];
  xp: number;
  level: number;
  inventoryLoading: boolean;
  blueprints: Record<string, any>; // blueprint data keyed by blueprint id
  faction: string | null;
  classType: string | null;        // renamed from playerClass to classType
  zone: string | null;             // NEW

  // Setters
  setPlayer: (player: string) => void;
  setInventory: (items: string[]) => void;
  setKnownItems: (items: string[]) => void;
  setXP: (xp: number) => void;
  setLevel: (level: number) => void;
  setInventoryLoading: (loading: boolean) => void;
  setBlueprints: (blueprints: Record<string, any>) => void;
  setFaction: (faction: string | null) => void;
  setClassType: (classType: string | null) => void;  // renamed setter
  setZone: (zone: string | null) => void;            // NEW
};

export const useGameStore = create<GameState>((set) => ({
  player: null,
  inventory: [],
  knownItems: [],
  xp: 0,
  level: 1,
  inventoryLoading: false,
  blueprints: {},
  faction: null,
  classType: null,    // renamed
  zone: null,         // NEW

  setPlayer: (player) => set({ player }),
  setInventory: (items) => set({ inventory: items }),
  setKnownItems: (items) => set({ knownItems: items }),
  setXP: (xp) => set({ xp }),
  setLevel: (level) => set({ level }),
  setInventoryLoading: (loading) => set({ inventoryLoading: loading }),
  setBlueprints: (blueprints) => set({ blueprints }),
  setFaction: (faction) => set({ faction }),
  setClassType: (classType) => set({ classType }),    // renamed setter
  setZone: (zone) => set({ zone }),                    // NEW setter
}));
