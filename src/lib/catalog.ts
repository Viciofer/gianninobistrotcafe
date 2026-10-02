import { supabase } from "@/integrations/supabase/client";

export type Section = string;

export type Category = {
  id: string;
  section: Section;
  name: string;
  description: string | null;
  schedule: string | null;
  parent_id: string | null;
  sort_order: number;
  visible: boolean;
};

export type Product = {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: string | null;
  sort_order: number;
  visible: boolean;
  available: boolean;
};

export type CategoryNode = Category & {
  products: Product[];
  children: CategoryNode[];
};

export async function fetchSection(
  section: Section,
  opts: { includeHidden?: boolean } = {},
): Promise<CategoryNode[]> {
  const includeHidden = !!opts.includeHidden;
  const catQ = supabase.from("categories").select("*").eq("section", section).order("sort_order");
  const prodQ = supabase.from("products").select("*").order("sort_order");

  const [catRes, prodRes] = await Promise.all([catQ, prodQ]);
  if (catRes.error) throw catRes.error;
  if (prodRes.error) throw prodRes.error;

  const cats = (catRes.data as Category[]).filter((c) => includeHidden || c.visible);
  const prods = (prodRes.data as Product[]).filter((p) => includeHidden || (p.visible && p.available));

  const byCat = new Map<string, Product[]>();
  prods.forEach((p) => {
    const arr = byCat.get(p.category_id) ?? [];
    arr.push(p);
    byCat.set(p.category_id, arr);
  });

  const nodes = new Map<string, CategoryNode>();
  cats.forEach((c) => nodes.set(c.id, { ...c, products: byCat.get(c.id) ?? [], children: [] }));

  const roots: CategoryNode[] = [];
  cats.forEach((c) => {
    const node = nodes.get(c.id)!;
    if (c.parent_id && nodes.has(c.parent_id)) {
      nodes.get(c.parent_id)!.children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SectionRow = {
  id: string;
  slug: string;
  title: string;
  icon: string;
  builtin: boolean;
  sort_order: number;
  visible: boolean;
};

export async function fetchSections(includeHidden = false): Promise<SectionRow[]> {
  const { data, error } = await supabase.from("sections").select("*").order("sort_order");
  if (error) throw error;
  return ((data ?? []) as SectionRow[]).filter((s) => includeHidden || s.visible);
}

export function sectionIcon(name: string): LucideIcon {
  const I = (Icons as unknown as Record<string, LucideIcon>)[name];
  return I ?? Icons.UtensilsCrossed;
}

export function sectionUrl(s: Pick<SectionRow, "slug" | "builtin">): string {
  return s.builtin ? `/${s.slug}` : `/sezione/${s.slug}`;
}
