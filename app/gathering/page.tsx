import GatheringPanel from "@/components/Gathering/GatheringPanel";
import AppShell from "@/components/Layout/AppShell";
import InventoryPanel from "@/components/Inventory/InventoryPanel";

export default function InventoryPage() {
  return (
    <AppShell>
      <InventoryPanel />
    </AppShell>
  );
}
export default function GatheringPage() {
  return (
    <main className="min-h-screen p-10 bg-gradient-to-br from-black to-zinc-900">
      <GatheringPanel />
    </main>
  );
}
