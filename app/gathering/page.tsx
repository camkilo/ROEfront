import GatheringPanel from "../components/Gathering/GatheringPanel";
import AppShell from "../components/Layout/AppShell";

export default function GatheringPage() {
  return (
    <main className="min-h-screen p-10 bg-gradient-to-br from-black to-zinc-900">
         <AppShell>
      <GatheringPanel />
    </main>
        </AppShell>
  );
}
