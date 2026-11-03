import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { stripHtml } from "@/lib/rich";
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
    <nav ref={navRef} aria-label={label} className="catalog-index sticky top-16 z-10 mb-12 border-y border-border py-3">
      <span className="mb-2 block text-[10px] uppercase text-muted-foreground">Indice</span>
      <ul className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const title = stripHtml(category.name);
          return (
            <li key={category.id} className="min-w-0 max-w-full">
              <Button asChild variant="outline" className="h-auto min-h-11 max-w-full whitespace-normal rounded-full px-4 py-2 text-left text-xs leading-snug">
                <a href={`#${slugify(title)}`}>{title}</a>
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}