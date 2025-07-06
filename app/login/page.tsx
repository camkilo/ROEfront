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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Auto-login if already authenticated
  useEffect(() => {
    const savedEmail = localStorage.getItem("playerEmail");
    if (savedEmail) {
      setName(savedEmail);
      router.push("/game");
    }
  }, [router, setName]);

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "login") {
        const res = await api.post("/login", { email, password });
        const data = res.data;

        // Zustand setters
        setName(data.player); // this is the email
        setInventory(data.inventory || []);
        setKnownItems(data.known_items || []);
        setKnownBlueprints(data.known_blueprints || []);
        setXP(data.xp || 0);
        setLevel(data.level || 1);
        setFaction(data.faction || null);
        setClassType(data.classType || null);
        setZone(data.zone || "starter-zone");

        // Save email to localStorage
        localStorage.setItem("playerEmail", data.player);

        router.push("/game");
      } else {
        const res = await api.post("/register", { email, password });
        alert(res.data.success || "Account created!");
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
      <section className="bg-white dark:bg-gray-900 shadow-xl rounded-3xl
