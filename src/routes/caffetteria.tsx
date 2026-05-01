import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/caffetteria")({
  head: () => ({
    meta: [
      { title: "Caffetteria — Giannino Bistrot Cafè" },
      { name: "description", content: "La caffetteria della Giannino Bistrot Cafè: espresso, cappuccino, the, infusi e specialità." },
      { property: "og:title", content: "Caffetteria — Giannino Bistrot Cafè" },
      { property: "og:description", content: "Espresso, cappuccino, the, infusi e specialità della caffetteria." },
    ],
  }),
  component: CaffetteriaPage,
});

type Item = { name: string; price?: string };

const items: Item[] = [
  { name: "Caffè espresso", price: "1,20" },
  { name: "Caffè macchiato", price: "1,50" },
  { name: "Caffè schiumato", price: "1,50" },
  { name: "Caffè dek", price: "1,50" },
  { name: "Caffè americano", price: "1,50" },
  { name: "Caffè ginseng", price: "1,80" },
  { name: "Caffè d'orzo", price: "1,80" },
  { name: "Caffè espresso siciliano", price: "1,80" },
  { name: "Caffè corretto", price: "2,00" },
  { name: "Caffè dek siciliano", price: "2,00" },
  { name: "Marocchino", price: "2,00" },
  { name: "Cappuccino", price: "2,00" },
  { name: "Cappuccino siciliano", price: "2,50" },
  { name: "Cappuccino dek", price: "2,50" },
  { name: "Cappuccino dek siciliano", price: "3,00" },
  { name: "Caffellatte", price: "2,50" },
  { name: "Latte macchiato", price: "3,00" },
  { name: "Latte mandorla", price: "3,50" },
  { name: "Cioccolata calda", price: "4,00" },
  { name: "Selezione di the e infusi", price: "4,00" },
];

function CaffetteriaPage() {
  return (
    <div className="px-4 md:px-12 lg:px-20 py-12 md:py-20 max-w-5xl mx-auto">
      <PageHeader title="Caffetteria" />
      <ul className="divide-y divide-border/60 border-y border-border">
        {items.map((item) => (
          <li key={item.name} className="grid grid-cols-[1fr_auto] gap-x-6 py-4 items-baseline">
            <p className="font-serif text-lg text-foreground leading-snug">{item.name}</p>
            {item.price && (
              <span className="font-serif text-lg text-accent tabular-nums whitespace-nowrap">
                € {item.price}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
