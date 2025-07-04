'use client';
import React, { useState, useEffect } from "react";
import api from "../lib/api/Client";
import { usePlayerStore } from "../store/usePlayerStore";
import { useRouter } from "next/router";
import { Button } from "../components/ui/button";

export default function LoginPage() {
  const setName = usePlayerStore((state) => state.setPlayer);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // On mount, check if user saved in localStorage
    const saved = localStorage.getItem("playerName");
    if (saved) {
      setName(saved);
      router.push("/"); // Redirect home or dashboard
    }
  }, [router, setName]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      if (mode === "login") {
        const res = await api.post("/login", { username, password });
setName(res.data.player); // or res.data.username
if (mode === "login") {
  const res = await api.post("/login", { username, password });

  setName(res.data.player); // Username from backend

  usePlayerStore.getState().setInventory(res.data.inventory || []);
  usePlayerStore.getState().setKnownItems(res.data.known_items || []);
  usePlayerStore.getState().setKnownBlueprints?.(res.data.known_blueprints || []);
  usePlayerStore.getState().setXP?.(res.data.xp || 0);
  usePlayerStore.getState().setLevel?.(res.data.level || 1);
  usePlayerStore.getState().setFaction?.(res.data.faction || null);
  usePlayerStore.getState().setClassType?.(res.data.classType || null);
  usePlayerStore.getState().setZone?.(res.data.zone || "starter-zone");

  localStorage.setItem("playerName", res.data.player);
  router.push("/"); // Go to game
}
usePlayerStore.getState().setInventory(res.data.inventory || []);
usePlayerStore.getState().setKnownItems(res.data.known_items || []);
usePlayerStore.getState().setKnownBlueprints?.(res.data.known_blueprints || []);
usePlayerStore.getState().setXP?.(res.data.xp || 0);
usePlayerStore.getState().setLevel?.(res.data.level || 1);
usePlayerStore.getState().setFaction?.(res.data.faction || null);
usePlayerStore.getState().setClassType?.(res.data.classType || null);
usePlayerStore.getState().setZone?.(res.data.zone || "starter-zone");

localStorage.setItem("playerName", res.data.player); // Persist player
        localStorage.setItem("playerName", res.data.username);
        router.push("/");
      } else {
        const res = await api.post("/register", { username, password });
        alert(res.data.success);
        setMode("login");
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Unexpected error");
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {mode === "login" ? "Log In" : "Register"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <Button type="submit" fullWidth>
            {mode === "login" ? "Log In" : "Register"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                className="text-primary underline"
                onClick={() => setMode("register")}
              >
                Register here
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="text-primary underline"
                onClick={() => setMode("login")}
              >
                Log in here
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
