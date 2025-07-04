// lib/api/world.ts

// Example: function to fetch world map data from your backend API
export async function fetchWorldMap() {
  try {
    const res = await fetch('/api/world');  // Adjust URL as needed
    if (!res.ok) {
      throw new Error(`Failed to fetch world map: ${res.statusText}`);
    }
    const data = await res.json();
    return data; // Return your world map data here
  } catch (error) {
    console.error('Error fetching world map:', error);
    throw error;
  }
}
