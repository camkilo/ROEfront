// ...existing code

export const usePlayerStore = create<PlayerState>((set) => ({
  // ...existing state & actions
  logout: () => {
    localStorage.removeItem("playerName");
    set({
      name: null,
      inventory: [],
      craftingInputs: [],
      knownBlueprints: [],
    });
  },
}));
