"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../../src/lib/api/Client";
import { usePlayerStore } from "../../src/store/usePlayerStore";

export default function LoginPage() {
  const router = useRouter();

  // Zustand setters
  const setName = usePlayerStore((state) => state.setPlayer);
  const setInventory = usePlayerStore((state) => state.setInventory);
  const setKnownItems = usePlayerStore((state) => state.setKnownItems);
  const setKnownBlueprints = usePlayerStore((state) => state.setKnownBlueprints);
  const setXP = usePlayerStore((state) => state.setXP);
  const setLevel = usePlayerStore((state) => state.setLevel);
  const setFaction = usePlayerStore((state) => state.setFaction);
  const setClassType = usePlayerStore((state) => state.setClassType);
  const setZone = usePlayerStore((state) => state.setZone);

  // UI State
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Auto-redirect if already logged in
  useEffect(() => {
    const saved = localStorage.getItem("playerName");
    if (saved) {
      setName(saved);
      router.push("/game");
    }
  }, [router, setName]);

  const clearForm = () => {
    setUsername("");
    setPassword("");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "login") {
        const res = await api.post("/login", { username, password });
        const data = res.data;

        // Set Zustand state
        setName(data.player);
        setInventory(data.inventory || []);
        setKnownItems(data.known_items || []);
        setKnownBlueprints(data.known_blueprints || []);
        setXP(data.xp || 0);
        setLevel(data.level || 1);
        setFaction(data.faction || null);
        setClassType(data.classType || null);
        setZone(data.zone || "starter-zone");

        // Persist login
        localStorage.setItem("playerName", data.player);

        router.push("/game");
      } else {
        const res = await api.post("/register", { username, password });
        alert(res.data.success);
        setMode("login");
        clearForm();
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-900 via-purple-800 to-pink-700 p-6">
      <section className="bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-10 max-w-md w-full">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 select-none">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            required
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-4 focus:ring-purple-400 dark:focus:ring-pink-500 transition"
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Password"
            required
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-4 focus:ring-purple-400 dark:focus:ring-pink-500 transition"
            disabled={loading}
          />

          {error && (
            <p className="text-red-500 text-center text-sm select-none">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:brightness-110 transition disabled:opacity-60"
          >
            {loading
              ? mode === "login"
                ? "Logging in..."
                : "Registering..."
              : mode === "login"
              ? "Log In"
              : "Register"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400 select-none">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => {
                  setMode("register");
                  clearForm();
                }}
                className="text-pink-500 font-semibold underline hover:text-pink-600"
                type="button"
              >
                Register here
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setMode("login");
                  clearForm();
                }}
                className="text-purple-500 font-semibold underline hover:text-purple-600"
                type="button"
              >
                Log in here
              </button>
            </>
          )}
        </p>
      </section>
    </main>
  );
}
