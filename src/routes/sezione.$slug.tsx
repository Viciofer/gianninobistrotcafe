import { createFileRoute } from "@tanstack/react-router";
import { RichText, stripHtml } from "@/lib/rich";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { fetchSection, fetchSections, type CategoryNode, type SectionRow } from "@/lib/catalog";

export const Route = createFileRoute("/sezione/$slug")({
  head: () => ({
    meta: [
      { title: "Giannino Bistrot Cafè — Sezione" },
      { name: "description", content: "Scopri le proposte della Giannino Bistrot Cafè." },
      { property: "og:title", content: "Giannino Bistrot Cafè" },
      { property: "og:description", content: "Scopri le proposte della Giannino Bistrot Cafè." },
    ],
  }),
  component: SectionPage,
});

function CategoryBlock({ c, nested }: { c: CategoryNode; nested?: boolean }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className={`font-serif text-foreground ${nested ? "text-xl" : "text-2xl"}`}><RichText html={c.name} /></h2>
        {c.schedule && <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1"><RichText html={c.schedule} /></p>}
        {c.description && <p className="text-muted-foreground mt-1"><RichText html={c.description} /></p>}
      </div>
      {c.products.length > 0 && (
        <ul className="divide-y divide-border/60 border-y border-border">
          {c.products.map((p) => (
            <li key={p.id} className="grid grid-cols-[1fr_auto] gap-x-6 py-4 items-baseline">
              <div>
                <p className="font-serif text-lg text-foreground leading-snug"><RichText html={p.name} /></p>
                {p.description && <p className="text-sm text-muted-foreground"><RichText html={p.description} /></p>}
              </div>
              {p.price && <span className="font-serif text-lg text-accent tabular-nums whitespace-nowrap">€ {p.price}</span>}
            </li>
          ))}
        </ul>
      )}
      {c.children.map((ch) => <CategoryBlock key={ch.id} c={ch} nested />)}
    </section>
  );
}

function SectionPage() {
  const { slug } = Route.useParams();
  const [sec, setSec] = useState<SectionRow | null | undefined>(undefined);
  const [cats, setCats] = useState<CategoryNode[] | null>(null);
  useEffect(() => {
    setCats(null);
    fetchSections().then((l) => setSec(l.find((s) => s.slug === slug) ?? null)).catch(() => setSec(null));
    fetchSection(slug).then(setCats).catch(() => setCats([]));
  }, [slug]);

  if (sec === null) return <div className="px-6 py-20 text-center text-muted-foreground">Sezione non disponibile.</div>;
  return (
    <div className="px-4 md:px-12 lg:px-20 py-12 md:py-20 max-w-5xl mx-auto">
      <PageHeader title={sec?.title ?? ""} />
      {!cats ? <p className="text-muted-foreground">Caricamento…</p> : (
        <div className="space-y-12">{cats.map((c) => <CategoryBlock key={c.id} c={c} />)}</div>
      )}
    </div>
  );
}
