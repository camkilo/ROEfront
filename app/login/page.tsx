// /app/login/page.tsx
// app/login/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGameStore } from "../../store/GameStore";

export default function LoginPage() {
  const router = useRouter();
  const setPlayer = useGameStore((s) => s.setPlayer);
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (!name.trim()) return;
    setPlayer(name);
    router.push("/world");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-white">
      <h1 className="text-2xl font-bold">Enter your name:</h1>
      <input
        className="text-black px-4 py-2 rounded"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />
      <button
        onClick={handleLogin}
        className="bg-purple-600 px-6 py-2 rounded hover:bg-purple-700"
      >
        Enter Realm
      </button>
    </div>
  );
}
