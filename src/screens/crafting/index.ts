import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api/Client";
import { usePlayerStore } from "../../store/usePlayerStore";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/Card";
import { Modal } from "../../components/ui/Modal";

export default function CraftingPage() {
  const player = usePlayerStore((state) => state.name);
  const inventory = usePlayerStore((state) => state.inventory);
  const setInventory = usePlayerStore((state) => state.addToInventory);
  const removeFromInventory = usePlayerStore((state) => state.removeFromInventory);
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [craftedItem, setCraftedItem] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Load inventory on mount (replace with API call if you want)
  const { data: invData } = useQuery(
    ["playerInventory", player],
    () => api.get(`/player/inventory?player=${player}`).then((res) => res.data),
    { enabled: !!player }
  );

  useEffect(() => {
    if (invData?.inventory) {
      // Reset inventory in store to API data
      // (You could also add a store setter for full inventory replace)
    }
  }, [invData]);

  const craftMutation = useMutation(
    (elements: string[]) =>
      api
        .post("/craft", {
          player,
          elements,
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        if (data.crafted_item) {
          setCraftedItem(data.crafted_item);
          // Update local inventory: remove inputs, add crafted item
          selectedElements.forEach((el) => removeFromInventory(el));
          // Add crafted item
          // You might want to add an 'addFullInventory' method to reset completely from backend
          setInventory(data.crafted_item);
          setSelectedElements([]);
          queryClient.invalidateQueries(["playerInventory", player]);
        }
      },
    }
  );

  function toggleElement(el: string) {
    setSelectedElements((prev) =>
      prev.includes(el) ? prev.filter((e) => e !== el) : [...prev, el]
    );
  }

  if (!player) return <div>Please log in to craft items.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-primary">Crafting</h2>

      <Card className="mb-6">
        <h3 className="font-semibold mb-2">Inventory</h3>
        <div className="flex flex-wrap gap-3">
          {inventory.length === 0 && <div>No items in inventory.</div>}
          {inventory.map((el, i) => (
            <button
              key={`${el}-${i}`}
              onClick={() => toggleElement(el)}
              className={`px-3 py-1 rounded border ${
                selectedElements.includes(el)
                  ? "bg-primary text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {el}
            </button>
          ))}
        </div>
      </Card>

      <Button
        disabled={selectedElements.length === 0 || craftMutation.isLoading}
        onClick={() => craftMutation.mutate(selectedElements)}
      >
        {craftMutation.isLoading ? "Crafting..." : "Craft Selected Elements"}
      </Button>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h3 className="text-xl font-bold mb-4">Crafted Item</h3>
        {craftedItem ? (
          <div className="text-center text-lg font-semibold">{craftedItem}</div>
        ) : (
          <div>No item crafted yet.</div>
        )}
        <Button variant="secondary" onClick={() => setModalOpen(false)}>
          Close
        </Button>
      </Modal>
    </div>
  );
}
