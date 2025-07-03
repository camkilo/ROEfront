import BlueprintPanel from "@/components/Blueprints/BlueprintPanel";
import AppShell from "@/components/Layout/AppShell";

export default function BlueprintPage() {
  return (
    <main className="min-h-screen p-10 bg-gradient-to-br from-black to-emerald-900">
       <AppShell>
      <BlueprintPanel />
    </main>
      </AppShell>
  );
}
