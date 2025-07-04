export const fetchWorldMap = async () => {
  const res = await fetch("/world/map");
  if (!res.ok) {
    throw new Error("Failed to fetch world map");
  }
  return res.json();
};
