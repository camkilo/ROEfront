export async function craftItem(player: string, elements: string[]) {
  try {
    const res = await fetch("/api/craft", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ player, elements }),
    });
    return await res.json();
  } catch (e) {
    return { error: "Network error during crafting." };
  }
}
