"use client";
import React, { useEffect, useState } from "react";

export default function BlueprintPanel() {
  const [blueprints, setBlueprints] = useState<any>({});

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/blueprints");
      const data = await res.json();
      setBlueprints(data);
    };
    load();
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-zinc-900 text-white p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">📜 Known Blueprints</h2>

      {Object.entries(blueprints).length === 0 ? (
        <p>No blueprints discovered yet.</p>
      ) : (
        <ul className="space-y-4">
          {Object.entries(blueprints).map(
            ([id, { ingredients, discovered_by }]: any) => (
              <li
                key={id}
                className="p-4 border border-zinc-700 rounded-lg bg-zinc-800"
              >
                <h3 className="font-bold text-emerald-400">{id}</h3>
                <p>
                  🧪 Ingredients:{" "}
                  <span className="text-amber-300">
                    {ingredients.join(" + ")}
                  </span>
                </p>
                <p>
                  🧙‍♂️ Discovered By:{" "}
                  <span className="text-sky-400">
                    {discovered_by.join(", ")}
                  </span>
                </p>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}
