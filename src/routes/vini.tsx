import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { useEffect, useState } from "react";
import { fetchSection, type CategoryNode, slugify } from "@/lib/catalog";

export const Route = createFileRoute("/vini")({
  head: () => ({
    meta: [
      { title: "Carta dei Vini — Giannino Bistrot Cafè" },
      { name: "description", content: "Champagne, spumanti, bianchi, rosati e rossi." },
      { property: "og:title", content: "Carta dei Vini — Giannino Bistrot Cafè" },
      { property: "og:description", content: "La nostra selezione di etichette." },
    ],
  }),
  component: ViniPage,
});

function ViniPage() {
  const [cats, setCats] = useState<CategoryNode[] | null>(null);
  useEffect(() => {
    fetchSection("vini").then(setCats).catch(() => setCats([]));
  }, []);

  return (
    <div className="px-4 md:px-12 lg:px-20 py-12 md:py-20 max-w-5xl mx-auto">
      <PageHeader title="Carta dei Vini" />

      {cats && cats.length > 0 && (
        <nav aria-label="Indice carta dei vini" className="mb-16 border-y border-border py-6">
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground block mb-3">Indice</span>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {cats.map((m) => (
              <li key={m.id}>
                <a
                  href={`#${slugify(m.name)}`}
                  className="text-sm text-foreground/80 hover:text-accent transition-colors underline-offset-4 hover:underline"
                >
                  {m.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {!cats ? (
        <p className="text-muted-foreground">Caricamento…</p>
      ) : (
        <div className="space-y-20">
          {cats.map((macro) => (
            <section key={macro.id} id={slugify(macro.name)} className="scroll-mt-20">
              <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-2">
                {macro.name}
              </h2>
              <div className="h-px w-12 bg-accent mb-10" />
              <div className="space-y-10">
                {macro.products.length > 0 && <WineList items={macro.products} />}
                {macro.children.map((sub) => (
                  <div key={sub.id}>
                    <h3 className="text-[11px] tracking-[0.3em] uppercase text-accent font-medium mb-5">
                      {sub.name}
                    </h3>
                    <WineList items={sub.products} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <p className="mt-20 pt-8 border-t border-border text-xs text-muted-foreground italic">
        I prezzi si intendono per bottiglia. Per disponibilità di annate diverse o calici fuori carta, chiedere al sommelier.
      </p>
    </div>
  );
}

function WineList({ items }: { items: { id: string; name: string; description: string | null; price: string | null }[] }) {
  return (
    <ul className="divide-y divide-border/60">
      {items.map((v) => (
        <li key={v.id} className="grid grid-cols-[1fr_auto] gap-x-6 py-4 items-baseline">
          <div className="min-w-0">
            <p className="font-serif text-lg text-foreground leading-snug">{v.name}</p>
            {v.description && (
              <p className="text-sm text-muted-foreground mt-1 font-light">{v.description}</p>
            )}
          </div>
          {v.price && (
            <span className="font-serif text-lg text-accent tabular-nums whitespace-nowrap">
              € {v.price}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
