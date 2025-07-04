import { create } from "zustand";

type GameState = {
  player: string | null;
  inventory: string[];
  knownItems: string[];
  xp: number;
  level: number;
  inventoryLoading: boolean;
  blueprints: Record<string, any>;
  faction: string | null;
  playerClass: string | null;
  classType: string | null;
  zone: string | null;

  // Setters
  setPlayer: (player: string) => void;
  setInventory: (items: string[]) => void;
  setKnownItems: (items: string[]) => void;
  setXP: (xp: number) => void;
  setLevel: (level: number) => void;
  setInventoryLoading: (loading: boolean) => void;
  setBlueprints: (blueprints: Record<string, any>) => void;
  setFaction: (faction: string | null) => void;
  setPlayerClass: (playerClass: string | null) => void;
  setClassType: (classType: string | null) => void;
  setZone: (zone: string | null) => void;
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
  playerClass: null,
  classType: null,
  zone: null,

  setPlayer: (player) => set({ player }),
  setInventory: (items) => set({ inventory: items }),
  setKnownItems: (items) => set({ knownItems: items }),
  setXP: (xp) => set({ xp }),
  setLevel: (level) => set({ level }),
  setInventoryLoading: (loading) => set({ inventoryLoading: loading }),
  setBlueprints: (blueprints) => set({ blueprints }),
  setFaction: (faction) => set({ faction }),
  setPlayerClass: (playerClass) => set({ playerClass }),
  setClassType: (classType) => set({ classType }),
  setZone: (zone) => set({ zone }),
}));
