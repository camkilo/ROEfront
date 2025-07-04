"use client";

import React, { useEffect, useState } from "react";

type Props = {
  player: string;
};

type Blueprint = {
  ingredients: string[];
  discovered_by: string[];
};

export default function BlueprintPanel({ player }: Props) {
  const [blueprints, setBlueprints] = useState<Record<string, Blueprint>>({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/blueprints");
      const data = await res.json();
      setBlueprints(data);
    };
    load();
  }, []);

  const filtered = Object.entries(blueprints).filter(
    ([id, val]) =>
      id.toLowerCase().includes(search.toLowerCase()) ||
      val.ingredients.some((i) =>
        i.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div className="max-w-3xl mx-auto bg-zinc-900 text-white p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">
        📜 Known Blueprints ({Object.keys(blueprints).length})
      </h2>

      <input
        type="text"
        className="mb-6 w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
        placeholder="Search blueprints by name or ingredient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p className="text-zinc-400">No matching blueprints found.</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map(([id, { ingredients, discovered_by }]) => (
            <li
              key={id}
              className="p-4 border border-zinc-700 rounded-lg bg-zinc-800"
            >
              <h3 className="font-bold text-emerald-400 text-lg">{id}</h3>
              <p className="mt-1">
                🧪 Ingredients:{" "}
                <span className="text-amber-300">
                  {ingredients.join(" + ")}
                </span>
              </p>
              <p className="mt-1">
                🧙‍♂️ Discovered By:{" "}
                <span className="text-sky-400 underline cursor-pointer hover:text-sky-300">
                  {discovered_by.join(", ")}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
