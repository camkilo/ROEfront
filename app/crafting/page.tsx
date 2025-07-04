import CraftingPanel from "../../src/components/Crafting/CraftingPanel";
import AppShell from "../../src/components/Layout/AppShell";

export default function CraftingPage() {
  return (
    <AppShell>
      <main className="min-h-screen p-10 bg-gradient-to-br from-zinc-900 to-zinc-800">
        <CraftingPanel />
      </main>
    </AppShell>
  );
}
