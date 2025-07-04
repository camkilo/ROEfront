"use client";
import React, { useEffect, useState } from "react";
import { fetchWorldMap } from "../../lib/api/world";

export default function WorldMapPanel() {
  const [zones, setZones] = useState<any>({});

  useEffect(() => {
    const load = async () => {
      const res = await fetchWorldMap();
      setZones(res);
    };
    load();
  }, []);

  return (
    <div className="bg-zinc-900 p-6 rounded-lg text-white shadow-xl max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🗺️ World Map</h2>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(zones).map(([zone, data]: any) => (
          <div
            key={zone}
            className={`p-4 border rounded ${
              data.unlocked ? "bg-indigo-700" : "bg-zinc-800"
            }`}
          >
            <h3 className="text-lg font-bold">{zone}</h3>
            <p>Owner: {data.owner || "None"}</p>
            <p>Unlocked: {data.unlocked ? "✅" : "❌"}</p>
            <p>Discovered Items: {data.discovered_items?.length}</p>
            <p>
              Conflict:{" "}
              {data.conflict ? (
                <span className="text-red-400">⚔️ Yes</span>
              ) : (
                "No"
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
