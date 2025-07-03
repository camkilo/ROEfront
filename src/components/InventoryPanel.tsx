"use client";
import { useGameStore } from "@/store/gameStore";

export default function InventoryPanel() {
  const inventory = useGameStore((state) => state.inventory);
  const knownItems = useGameStore((state) => state.knownItems);

  return (
    <div className="bg-slate-900 p-4 rounded-xl text-white shadow-xl w-full max-w-md">
      <h2 className="text-xl font-bold mb-3">🎒 Inventory</h2>
      {inventory.length === 0 ? (
        <p className="text-gray-400">Empty... go gather!</p>
      ) : (
        <ul className="grid grid-cols-3 gap-3">
          {inventory.map((item, index) => (
            <li
              key={index}
              className={`p-2 rounded bg-slate-700 text-center ${
                knownItems.includes(item) ? "border border-emerald-400" : ""
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
