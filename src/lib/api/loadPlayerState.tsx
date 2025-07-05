import { usePlayerStore } from "../../../src/store/usePlayerStore";

export function loadPlayerState(playerData: {
  player: string;
  inventory: string[];
  known_items: string[];
  known_blueprints: string[];
  xp: number;
  level: number;
  zone: string;
  faction: string | null;
  classType: string | null;
}) {
  const setPlayer = usePlayerStore.getState().setPlayer;
  const setInventory = usePlayerStore.getState().setInventory;
  const setKnownItems = usePlayerStore.getState().setKnownItems;
  const setKnownBlueprints = usePlayerStore.getState().setKnownBlueprints;
  const setXP = usePlayerStore.getState().setXP;
  const setLevel = usePlayerStore.getState().setLevel;
  const setZone = usePlayerStore.getState().setZone;
  const setFaction = usePlayerStore.getState().setFaction;
  const setClassType = usePlayerStore.getState().setClassType;

  setPlayer(playerData.player);
  setInventory(playerData.inventory || []);
  setKnownItems(playerData.known_items || []);
  setKnownBlueprints(playerData.known_blueprints || []);
  setXP(playerData.xp || 0);
  setLevel(playerData.level || 1);
  setZone(playerData.zone || "starter-zone");
  setFaction(playerData.faction ?? "");
  setClassType(playerData.classType ?? "");
}
