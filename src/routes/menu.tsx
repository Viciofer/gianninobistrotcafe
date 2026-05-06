import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { useEffect, useState } from "react";
import { fetchSection, type CategoryNode } from "@/lib/catalog";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menù — Giannino Bistrot Cafè" },
      { name: "description", content: "Il menù della Giannino Bistrot Cafè." },
      { property: "og:title", content: "Menù — Giannino Bistrot Cafè" },
      { property: "og:description", content: "Cucina, dal focolare al piatto." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [cats, setCats] = useState<CategoryNode[] | null>(null);
  useEffect(() => {
    fetchSection("menu").then(setCats).catch(() => setCats([]));
  }, []);

  return (
    <div className="px-6 md:px-16 lg:px-24 py-12 md:py-20 max-w-5xl mx-auto">
      <PageHeader title="Menù" />
      {!cats ? (
        <p className="text-muted-foreground">Caricamento…</p>
      ) : cats.length === 0 ? (
        <p className="text-muted-foreground italic">Nessun piatto disponibile al momento.</p>
      ) : (
        <div className="space-y-14">
          {cats.map((s) => (
            <section key={s.id}>
              <div className="mb-6">
                <h2 className="font-serif text-3xl text-foreground">{s.name}</h2>
                {s.schedule && (
                  <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mt-2">
                    {s.schedule}
                  </p>
                )}
              </div>
              {s.products.length > 0 && (
                <ul className="divide-y divide-border border-y border-border">
                  {s.products.map((p) => (
                    <li key={p.id} className="py-5 flex items-baseline gap-6">
                      <div className="flex-1">
                        <h3 className="font-serif text-xl text-foreground">{p.name}</h3>
                        {p.description && (
                          <p className="text-sm text-muted-foreground mt-1 font-light">
                            {p.description}
                          </p>
                        )}
                      </div>
                      {p.price && (
                        <div className="font-serif text-xl text-accent tabular-nums">€ {p.price}</div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              {s.description && (
                <p className="text-xs italic text-muted-foreground mt-3 text-right">{s.description}</p>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
