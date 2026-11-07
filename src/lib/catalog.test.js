import { describe, expect, test } from "bun:test";
import { filterSections, isCatalogSection, sectionUrl } from "./catalog";

const contacts = { id: "contacts", slug: "contatti", title: "Contatti", icon: "Mail", builtin: true, sort_order: 0, visible: true };
const wines = { id: "wines", slug: "vini", title: "Vini", icon: "Wine", builtin: true, sort_order: 1, visible: true };

describe("Contacts section navigation", () => {
  test("Contacts uses its existing dedicated public page", () => {
    expect(sectionUrl(contacts)).toBe("/contatti");
  });
  test("Contacts retains the chosen position among catalog sections", () => {
    expect(filterSections([contacts, wines]).map((s) => s.slug)).toEqual(["contatti", "vini"]);
    expect(filterSections([wines, contacts]).map((s) => s.slug)).toEqual(["vini", "contatti"]);
  });
  test("hidden Contacts disappears publicly but remains manageable", () => {
    const hidden = { ...contacts, visible: false };
    expect(filterSections([hidden, wines])).toEqual([wines]);
    expect(filterSections([hidden, wines], true)).toEqual([hidden, wines]);
  });
  test("Contacts keeps dedicated management rather than product categories", () => {
    expect([contacts, wines].filter(isCatalogSection)).toEqual([wines]);
  });
});
import { orderCategories as oc } from "./catalog";
test("orderCategories puts each subcategory right after its parent", () => {
  const r = oc([
    { id: "s1", parent_id: "b", sort_order: 0 },
    { id: "a", parent_id: null, sort_order: 0 },
    { id: "b", parent_id: null, sort_order: 1 },
    { id: "s2", parent_id: "a", sort_order: 0 },
  ]).map((c) => c.id);
  expect(r).toEqual(["a", "s2", "b", "s1"]);
});
