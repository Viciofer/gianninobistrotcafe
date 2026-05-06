import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { useEffect, useState } from "react";
import { fetchSection, type CategoryNode, slugify } from "@/lib/catalog";

export const Route = createFileRoute("/drink")({
  head: () => ({
    meta: [
      { title: "Drink List — Giannino Bistrot Cafè" },
      { name: "description", content: "Bibite, birre, cocktail, gin, distillati e amari." },
      { property: "og:title", content: "Drink List — Giannino Bistrot Cafè" },
      { property: "og:description", content: "La selezione completa di drink." },
    ],
  }),
  component: DrinkPage,
});

function DrinkPage() {
  const [cats, setCats] = useState<CategoryNode[] | null>(null);
  useEffect(() => {
    fetchSection("drink").then(setCats).catch(() => setCats([]));
  }, []);

  return (
    <div className="px-4 md:px-12 lg:px-20 py-12 md:py-20 max-w-5xl mx-auto">
      <PageHeader title="Drink List" />

      {cats && cats.length > 0 && (
        <nav aria-label="Indice drink list" className="mb-16 border-y border-border py-6">
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground block mb-3">Indice</span>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {cats.map((g) => (
              <li key={g.id}>
                <a
                  href={`#${slugify(g.name)}`}
                  className="text-sm text-foreground/80 hover:text-accent transition-colors underline-offset-4 hover:underline"
                >
                  {g.name}
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
          {cats.map((group) => (
            <section key={group.id} id={slugify(group.name)} className="scroll-mt-20">
              <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-2">
                {group.name}
              </h2>
              <div className="h-px w-12 bg-accent mb-10" />

              <div className="space-y-10">
                {group.products.length > 0 && (
                  <ItemList items={group.products} />
                )}
                {group.children.map((sub) => (
                  <div key={sub.id} className="scroll-mt-20">
                    {sub.name !== group.name && (
                      <h3 className="text-[11px] tracking-[0.3em] uppercase text-accent font-medium mb-5">
                        {sub.name}
                      </h3>
                    )}
                    <ItemList items={sub.products} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function ItemList({ items }: { items: { id: string; name: string; description: string | null; price: string | null }[] }) {
  return (
    <ul className="divide-y divide-border/60">
      {items.map((item) => (
        <li key={item.id} className="grid grid-cols-[1fr_auto] gap-x-6 py-4 items-baseline">
          <div className="min-w-0">
            <p className="font-serif text-lg text-foreground leading-snug">{item.name}</p>
            {item.description && (
              <p className="text-sm text-muted-foreground mt-1 font-light">{item.description}</p>
            )}
          </div>
          {item.price && (
            <span className="font-serif text-lg text-accent tabular-nums whitespace-nowrap">
              € {item.price}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
