import { useEffect, useRef } from "react";
import { RichText, stripHtml } from "@/lib/rich";
import { slugify, type CategoryNode } from "@/lib/catalog";

export function CatalogIndex({ categories, label }: { categories: CategoryNode[]; label: string }) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const container = nav?.parentElement;
    if (!nav || !container) return;
    const update = () => container.style.setProperty("--catalog-index-height", `${nav.getBoundingClientRect().height}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(nav);
    return () => {
      observer.disconnect();
      container.style.removeProperty("--catalog-index-height");
    };
  }, []);

  return (
    <nav ref={navRef} aria-label={label} className="catalog-index sticky top-16 z-10 mb-12 border-y border-border py-1.5">
      <span className="mb-1 block text-[10px] tracking-[0.25em] uppercase text-muted-foreground">Indice</span>
      <ul className="flex flex-wrap gap-x-1.5 gap-y-1">
        {categories.map((category) => (
          <li key={category.id}>
            <a
              href={`#${slugify(stripHtml(category.name))}`}
              className="inline-block rounded-full border border-border px-2 py-0.5 text-sm leading-tight text-foreground/80 transition-colors hover:border-accent hover:text-accent"
            >
              <RichText html={category.name} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
