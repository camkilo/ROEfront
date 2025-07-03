"use client";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/apiClient";

import GameDashboard from "@/components/Dashboard/GameDashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 py-10">
      <GameDashboard />
    </main>
  );
}
export default function Home() {
  const { data, error, isLoading } = useQuery(["elements"], () =>
    api.get("/elements").then((res) => res.data)
  );

  if (isLoading) return <div>Loading elements...</div>;
  if (error) return <div>Error loading elements</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-5xl font-extrabold mb-6 text-primary">
        Realm of Echoes - Elements Overview
      </h1>
      <ul className="grid grid-cols-4 gap-4">
        {data.map((el: any) => (
          <li
            key={el.symbol}
            className="bg-secondary rounded-lg p-4 text-center shadow hover:shadow-lg transition"
          >
            <div className="text-2xl font-bold">{el.symbol}</div>
            <div className="text-lg">{el.name}</div>
            <div className="text-sm">Atomic #{el.atomic_number}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
