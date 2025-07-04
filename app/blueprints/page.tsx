import BlueprintPanel from "@/components/Blueprints/BlueprintPanel";
import AppShell from "@/components/Layout/AppShell";

export default function BlueprintPage() {
  return (
    <AppShell>
      <main className="min-h-screen p-10 bg-gradient-to-br from-black to-emerald-900">
        <BlueprintPanel />
      </main>
    </AppShell>
  );
}
