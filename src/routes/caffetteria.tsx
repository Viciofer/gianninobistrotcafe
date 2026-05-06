import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { useEffect, useState } from "react";
import { fetchSection, type CategoryNode } from "@/lib/catalog";

export const Route = createFileRoute("/caffetteria")({
  head: () => ({
    meta: [
      { title: "Caffetteria — Giannino Bistrot Cafè" },
      { name: "description", content: "La caffetteria della Giannino Bistrot Cafè." },
      { property: "og:title", content: "Caffetteria — Giannino Bistrot Cafè" },
      { property: "og:description", content: "Espresso, cappuccino, the e infusi." },
    ],
  }),
  component: CaffetteriaPage,
});

function CaffetteriaPage() {
  const [cats, setCats] = useState<CategoryNode[] | null>(null);
  useEffect(() => {
    fetchSection("caffetteria").then(setCats).catch(() => setCats([]));
  }, []);

  return (
    <div className="px-4 md:px-12 lg:px-20 py-12 md:py-20 max-w-5xl mx-auto">
      <PageHeader title="Caffetteria" />
      {!cats ? (
        <p className="text-muted-foreground">Caricamento…</p>
      ) : (
        <div className="space-y-12">
          {cats.map((c) => (
            <section key={c.id}>
              {cats.length > 1 && (
                <h2 className="font-serif text-2xl text-foreground mb-4">{c.name}</h2>
              )}
              <ul className="divide-y divide-border/60 border-y border-border">
                {c.products.map((item) => (
                  <li key={item.id} className="grid grid-cols-[1fr_auto] gap-x-6 py-4 items-baseline">
                    <p className="font-serif text-lg text-foreground leading-snug">{item.name}</p>
                    {item.price && (
                      <span className="font-serif text-lg text-accent tabular-nums whitespace-nowrap">
                        € {item.price}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
