"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // useRouter from 'next/navigation' for app dir
import api from "../../src/lib/api/Client";
import { useGameStore } from "../../src/components/store/GameStore";
import { Button } from "../../src/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const setPlayer = useGameStore((s) => s.setPlayer);
  const setFaction = useGameStore((s) => s.setFaction);
  const setClassType = useGameStore((s) => s.setClassType);

  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedPlayer = localStorage.getItem("playerName");
    if (savedPlayer) {
      setPlayer(savedPlayer);
      router.push("/character-creation");
    }
  }, [router, setPlayer]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "login") {
        const res = await api.post("/login", { username, password });
        // On login success, set player data here
        setPlayer(res.data.username);
        // Optionally set faction/class if returned from backend
        if (res.data.faction) setFaction(res.data.faction);
        if (res.data.classType) setClassType(res.data.classType);
        localStorage.setItem("playerName", res.data.username);
        // Redirect to 3D world directly or character creation if new player
        router.push("/world");
      } else {
        const res = await api.post("/register", { username, password });
        alert(res.data.success);
        // After registration, redirect to character creation to pick class/faction
        router.push("/character-creation");
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Unexpected error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-zinc-900 to-black p-6">
      <div className="w-full max-w-md bg-zinc-800 rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {mode === "login" ? "Login to Realm of Echoes" : "Register New Account"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
            required
            minLength={3}
            maxLength={20}
            className="w-full p-3 rounded bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full p-3 rounded bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type="submit"
            fullWidth
            disabled={loading}
            className="bg-purple-700 hover:bg-purple-800"
          >
            {loading ? "Processing..." : mode === "login" ? "Log In" : "Register"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-zinc-400">
          {mode === "login" ? (
            <>
              New player?{" "}
              <button
                className="text-purple-400 underline hover:text-purple-600"
                onClick={() => setMode("register")}
              >
                Register here
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="text-purple-400 underline hover:text-purple-600"
                onClick={() => setMode("login")}
              >
                Log in here
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
