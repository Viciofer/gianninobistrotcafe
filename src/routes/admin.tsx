import { createFileRoute, Outlet, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Pannello Admin — Giannino Bistrot Cafè" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const { session, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) navigate({ to: "/admin/login" });
  }, [loading, session, navigate]);

  if (loading) {
    return <div className="px-6 py-12 text-muted-foreground">Caricamento…</div>;
  }

  if (!session) return null;

  if (!isAdmin) {
    return (
      <div className="px-6 py-20 max-w-xl mx-auto text-center space-y-4">
        <h1 className="font-serif text-3xl text-foreground">Accesso non autorizzato</h1>
        <p className="text-muted-foreground">
          Il tuo account non ha i permessi di amministratore.
        </p>
        <Button variant="outline" onClick={signOut}>Esci</Button>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-12 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
        <div>
          <h1 className="font-serif text-2xl text-foreground">Pannello Admin</h1>
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">
            Gestione catalogo
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/" className="text-sm text-muted-foreground hover:text-accent">Sito</Link>
          <Button variant="outline" size="sm" onClick={signOut}>Esci</Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
