import GatheringPanel from "../../src/components/Gathering/GatheringPanel";
import AppShell from "../../src/components/Layout/AppShell";
import { useGameStore } from "@/store/gameStore";

export default function GatheringPage() {
  
const player = useGameStore((state) => state.player);  
  return (
    <AppShell>
      <main className="min-h-screen p-10 bg-gradient-to-br from-black to-zinc-900">
        <GatheringPanel />
      </main>
    </AppShell>
  );
}
