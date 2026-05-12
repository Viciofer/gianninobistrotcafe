import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Eye, EyeOff, Search } from "lucide-react";
import { SortableList } from "@/components/SortableList";

async function persistOrder(
  table: "categories" | "products",
  ordered: { id: string }[],
) {
  const updates = ordered.map((it, idx) =>
    supabase.from(table).update({ sort_order: idx }).eq("id", it.id),
  );
  const results = await Promise.all(updates);
  const err = results.find((r) => r.error)?.error;
  return err ?? null;
}

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Pannello Admin — Giannino Bistrot Cafè" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type Section = "menu" | "caffetteria" | "drink" | "vini";

type Category = {
  id: string;
  section: Section;
  name: string;
  description: string | null;
  schedule: string | null;
  parent_id: string | null;
  sort_order: number;
  visible: boolean;
};

type Product = {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: string | null;
  sort_order: number;
  visible: boolean;
  available: boolean;
};

const SECTIONS: { value: Section; label: string }[] = [
  { value: "menu", label: "Menù" },
  { value: "caffetteria", label: "Caffetteria" },
  { value: "drink", label: "Drink List" },
  { value: "vini", label: "Carta dei Vini" },
];

function AdminPage() {
  const { session, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [section, setSection] = useState<Section>("menu");
  const [tab, setTab] = useState<"products" | "categories" | "contacts">("products");
  const [searchOpen, setSearchOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (!loading && !session) navigate({ to: "/admin/login" });
  }, [loading, session, navigate]);

  const refresh = useCallback(async () => {
    setLoadingData(true);
    const [catRes, prodRes] = await Promise.all([
      supabase.from("categories").select("*").eq("section", section).order("sort_order"),
      supabase.from("products").select("*").order("sort_order"),
    ]);
    if (catRes.error) toast.error("Errore caricamento categorie");
    if (prodRes.error) toast.error("Errore caricamento prodotti");
    setCategories((catRes.data as Category[]) ?? []);
    const catIds = new Set((catRes.data ?? []).map((c) => c.id));
    setProducts(((prodRes.data as Product[]) ?? []).filter((p) => catIds.has(p.category_id)));
    setLoadingData(false);
  }, [section]);

  useEffect(() => {
    if (isAdmin) refresh();
  }, [isAdmin, refresh]);

  if (loading) return <div className="px-6 py-12 text-muted-foreground">Caricamento…</div>;
  if (!session) return null;

  if (!isAdmin) {
    return (
      <div className="px-6 py-20 max-w-xl mx-auto text-center space-y-4">
        <h1 className="font-serif text-3xl text-foreground">Accesso non autorizzato</h1>
        <p className="text-muted-foreground">Il tuo account non ha i permessi di amministratore.</p>
        <Button variant="outline" onClick={signOut}>Esci</Button>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-12 py-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4 mb-6">
        <div>
          <h1 className="font-serif text-2xl text-foreground">Pannello Admin</h1>
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">
            Gestione catalogo
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setSearchOpen(true)} title="Cerca" aria-label="Cerca">
            <Search className="h-4 w-4" />
          </Button>
          <Link to="/" className="text-sm text-muted-foreground hover:text-accent">Sito</Link>
          <Button variant="outline" size="sm" onClick={signOut}>Esci</Button>
        </div>
      </div>

      <SearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onJumpToCategory={(c) => {
          setSection(c.section);
          setTab("categories");
          setSearchOpen(false);
        }}
        onJumpToProduct={(p, sec) => {
          setSection(sec);
          setTab("products");
          setSearchOpen(false);
        }}
      />

      {tab !== "contacts" && (
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <Label className="text-xs tracking-widest uppercase text-muted-foreground">Sezione</Label>
          <Select value={section} onValueChange={(v) => setSection(v as Section)}>
            <SelectTrigger className="w-[220px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {SECTIONS.map((s) => (
                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <Tabs value={tab} onValueChange={(v) => setTab(v as "products" | "categories" | "contacts")}>
        <TabsList>
          <TabsTrigger value="products">Prodotti</TabsTrigger>
          <TabsTrigger value="categories">Categorie</TabsTrigger>
          <TabsTrigger value="contacts">Contatti</TabsTrigger>
        </TabsList>
        <TabsContent value="products" className="mt-6">
          <ProductsManager
            section={section}
            categories={categories}
            products={products}
            loading={loadingData}
            onChange={refresh}
          />
        </TabsContent>
        <TabsContent value="categories" className="mt-6">
          <CategoriesManager
            section={section}
            categories={categories}
            loading={loadingData}
            onChange={refresh}
          />
        </TabsContent>
        <TabsContent value="contacts" className="mt-6">
          <ContactsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ---------- CATEGORIES ----------

function CategoriesManager({
  section,
  categories,
  loading,
  onChange,
}: {
  section: Section;
  categories: Category[];
  loading: boolean;
  onChange: () => void;
}) {
  const [editing, setEditing] = useState<Category | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Category | null>(null);

  async function toggleVisible(c: Category) {
    const { error } = await supabase
      .from("categories")
      .update({ visible: !c.visible })
      .eq("id", c.id);
    if (error) return toast.error(error.message);
    toast.success(c.visible ? "Categoria nascosta" : "Categoria visibile");
    onChange();
  }

  async function doDelete(c: Category) {
    const { error } = await supabase.from("categories").delete().eq("id", c.id);
    if (error) return toast.error(error.message);
    toast.success("Categoria eliminata");
    setConfirmDelete(null);
    onChange();
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setCreating(true)} size="sm">
          <Plus className="h-4 w-4 mr-1" /> Nuova categoria
        </Button>
      </div>
      {loading ? (
        <p className="text-muted-foreground">Caricamento…</p>
      ) : categories.length === 0 ? (
        <p className="text-muted-foreground italic">Nessuna categoria.</p>
      ) : (
        (() => {
          const roots = categories
            .filter((c) => c.parent_id === null)
            .sort((a, b) => a.sort_order - b.sort_order);
          const childrenOf = (id: string) =>
            categories
              .filter((c) => c.parent_id === id)
              .sort((a, b) => a.sort_order - b.sort_order);

          const reorder = async (items: Category[]) => {
            const err = await persistOrder("categories", items);
            if (err) return toast.error(err.message);
            onChange();
          };

          const renderRow = (c: Category, isChild = false) => (
            <>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">
                  {isChild && <span className="text-muted-foreground">↳ </span>}
                  {c.name}
                </p>
                {c.schedule && <p className="text-xs text-muted-foreground">{c.schedule}</p>}
              </div>
              <Button variant="ghost" size="icon" onClick={() => toggleVisible(c)} title={c.visible ? "Nascondi" : "Mostra"}>
                {c.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setEditing(c)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setConfirmDelete(c)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </>
          );

          return (
            <div className="border-y border-border">
              <SortableList
                items={roots}
                onReorder={reorder}
                renderItem={(c) => (
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center gap-3">{renderRow(c)}</div>
                    {childrenOf(c.id).length > 0 && (
                      <div className="ml-6 border-l border-border pl-3">
                        <SortableList
                          items={childrenOf(c.id)}
                          onReorder={reorder}
                          renderItem={(child) => renderRow(child, true)}
                        />
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
          );
        })()
      )}

      {(editing || creating) && (
        <CategoryDialog
          section={section}
          categories={categories}
          category={editing}
          onClose={() => { setEditing(null); setCreating(false); }}
          onSaved={() => { setEditing(null); setCreating(false); onChange(); }}
        />
      )}

      <AlertDialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminare la categoria?</AlertDialogTitle>
            <AlertDialogDescription>
              Verranno eliminati anche tutti i prodotti e le sotto-categorie associati. Operazione irreversibile.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={() => confirmDelete && doDelete(confirmDelete)}>
              Elimina
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function CategoryDialog({
  section,
  categories,
  category,
  onClose,
  onSaved,
}: {
  section: Section;
  categories: Category[];
  category: Category | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(category?.name ?? "");
  const [description, setDescription] = useState(category?.description ?? "");
  const [schedule, setSchedule] = useState(category?.schedule ?? "");
  const [parentId, setParentId] = useState<string>(category?.parent_id ?? "__none__");
  const [sortOrder, setSortOrder] = useState(category?.sort_order ?? 0);
  const [visible, setVisible] = useState(category?.visible ?? true);
  const [saving, setSaving] = useState(false);

  const possibleParents = categories.filter(
    (c) => c.parent_id === null && c.id !== category?.id,
  );

  async function save() {
    if (!name.trim()) return toast.error("Nome obbligatorio");
    setSaving(true);
    const payload = {
      section,
      name: name.trim(),
      description: description.trim() || null,
      schedule: schedule.trim() || null,
      parent_id: parentId === "__none__" ? null : parentId,
      sort_order: sortOrder,
      visible,
    };
    const { error } = category
      ? await supabase.from("categories").update(payload).eq("id", category.id)
      : await supabase.from("categories").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(category ? "Categoria aggiornata" : "Categoria creata");
    onSaved();
  }

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{category ? "Modifica categoria" : "Nuova categoria"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nome *</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Sotto-categoria di</Label>
            <Select value={parentId} onValueChange={setParentId}>
              <SelectTrigger><SelectValue placeholder="Nessuna" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="__none__">— Nessuna (categoria principale) —</SelectItem>
                {possibleParents.map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Orario / Sotto-titolo</Label>
            <Input value={schedule} onChange={(e) => setSchedule(e.target.value)} placeholder="es. Dalle 12:00 alle 15:00" />
          </div>
          <div className="space-y-2">
            <Label>Nota</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
          </div>
          <div className="flex gap-4">
            <div className="space-y-2 flex-1">
              <Label>Ordine</Label>
              <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} />
            </div>
            <div className="flex items-center gap-2 pt-7">
              <Switch checked={visible} onCheckedChange={setVisible} id="vis-cat" />
              <Label htmlFor="vis-cat">Visibile</Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annulla</Button>
          <Button onClick={save} disabled={saving}>{saving ? "Salvataggio…" : "Salva"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---------- PRODUCTS ----------

function ProductsManager({
  section,
  categories,
  products,
  loading,
  onChange,
}: {
  section: Section;
  categories: Category[];
  products: Product[];
  loading: boolean;
  onChange: () => void;
}) {
  const [filterCat, setFilterCat] = useState<string>("__all__");
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Product | null>(null);

  const filtered =
    filterCat === "__all__" ? products : products.filter((p) => p.category_id === filterCat);

  async function patch(p: Product, fields: Partial<Product>) {
    const { error } = await supabase.from("products").update(fields).eq("id", p.id);
    if (error) return toast.error(error.message);
    onChange();
  }

  async function doDelete(p: Product) {
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) return toast.error(error.message);
    toast.success("Prodotto eliminato");
    setConfirmDelete(null);
    onChange();
  }

  function catLabel(id: string) {
    const c = categories.find((x) => x.id === id);
    if (!c) return "—";
    const parent = c.parent_id ? categories.find((p) => p.id === c.parent_id) : null;
    return parent ? `${parent.name} › ${c.name}` : c.name;
  }

  if (categories.length === 0) {
    return (
      <p className="text-muted-foreground italic">
        Crea prima almeno una categoria nella scheda "Categorie".
      </p>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
        <div className="space-y-2">
          <Label className="text-xs tracking-widest uppercase text-muted-foreground">Filtra per categoria</Label>
          <Select value={filterCat} onValueChange={setFilterCat}>
            <SelectTrigger className="w-[280px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">Tutte</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>{catLabel(c.id)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setCreating(true)} size="sm">
          <Plus className="h-4 w-4 mr-1" /> Nuovo prodotto
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Caricamento…</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground italic">Nessun prodotto.</p>
      ) : (
        (() => {
          // Group products by category to allow drag within each group
          const groups = new Map<string, Product[]>();
          for (const p of filtered) {
            const arr = groups.get(p.category_id) ?? [];
            arr.push(p);
            groups.set(p.category_id, arr);
          }
          for (const arr of groups.values()) arr.sort((a, b) => a.sort_order - b.sort_order);

          const reorder = async (items: Product[]) => {
            const err = await persistOrder("products", items);
            if (err) return toast.error(err.message);
            onChange();
          };

          const renderProduct = (p: Product) => (
            <>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">
                  {p.name}
                  {p.price && <span className="ml-3 text-accent tabular-nums">€ {p.price}</span>}
                </p>
                {p.description && (
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{p.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => patch(p, { visible: !p.visible })} title={p.visible ? "Nascondi" : "Mostra"}>
                  {p.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setEditing(p)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setConfirmDelete(p)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </>
          );

          return (
            <div className="space-y-6">
              {Array.from(groups.entries()).map(([catId, items]) => (
                <div key={catId}>
                  {filterCat === "__all__" && (
                    <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
                      {catLabel(catId)}
                    </p>
                  )}
                  <div className="border-y border-border">
                    <SortableList items={items} onReorder={reorder} renderItem={renderProduct} />
                  </div>
                </div>
              ))}
            </div>
          );
        })()
      )}

      {(editing || creating) && (
        <ProductDialog
          categories={categories}
          product={editing}
          defaultCategoryId={filterCat !== "__all__" ? filterCat : categories[0].id}
          section={section}
          onClose={() => { setEditing(null); setCreating(false); }}
          onSaved={() => { setEditing(null); setCreating(false); onChange(); }}
        />
      )}

      <AlertDialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminare il prodotto?</AlertDialogTitle>
            <AlertDialogDescription>Operazione irreversibile.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={() => confirmDelete && doDelete(confirmDelete)}>
              Elimina
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function ProductDialog({
  categories,
  product,
  defaultCategoryId,
  onClose,
  onSaved,
}: {
  categories: Category[];
  product: Product | null;
  defaultCategoryId: string;
  section: Section;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product?.price ?? "");
  const [categoryId, setCategoryId] = useState(product?.category_id ?? defaultCategoryId);
  const [sortOrder, setSortOrder] = useState(product?.sort_order ?? 0);
  const [visible, setVisible] = useState(product?.visible ?? true);
  const [saving, setSaving] = useState(false);

  function catLabel(id: string) {
    const c = categories.find((x) => x.id === id);
    if (!c) return "";
    const parent = c.parent_id ? categories.find((p) => p.id === c.parent_id) : null;
    return parent ? `${parent.name} › ${c.name}` : c.name;
  }

  async function save() {
    if (!name.trim()) return toast.error("Nome obbligatorio");
    if (!categoryId) return toast.error("Categoria obbligatoria");
    setSaving(true);
    const payload = {
      category_id: categoryId,
      name: name.trim(),
      description: description.trim() || null,
      price: price.trim() || null,
      sort_order: sortOrder,
      visible,
    };
    const { error } = product
      ? await supabase.from("products").update(payload).eq("id", product.id)
      : await supabase.from("products").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(product ? "Prodotto aggiornato" : "Prodotto creato");
    onSaved();
  }

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product ? "Modifica prodotto" : "Nuovo prodotto"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nome *</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Categoria *</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{catLabel(c.id)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Prezzo (es. 6,50)</Label>
            <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="lascia vuoto se nessun prezzo" />
          </div>
          <div className="space-y-2">
            <Label>Descrizione</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="space-y-2 flex-1 min-w-[120px]">
              <Label>Ordine</Label>
              <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} />
            </div>
            <div className="flex items-center gap-2 pt-7">
              <Switch checked={visible} onCheckedChange={setVisible} id="vis-p" />
              <Label htmlFor="vis-p">Visibile</Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annulla</Button>
          <Button onClick={save} disabled={saving}>{saving ? "Salvataggio…" : "Salva"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---------- CONTACTS ----------

type ContactInfo = {
  id: string;
  address_line1: string;
  address_line2: string;
  phone: string;
  email: string;
  instagram_handle: string;
  instagram_url: string;
  maps_pin_address: string;
  schedule_main: string;
  schedule_note: string;
};

function ContactsManager() {
  const [info, setInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from("contact_info")
      .select("*")
      .limit(1)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) toast.error(error.message);
        if (data) setInfo(data as ContactInfo);
        setLoading(false);
      });
  }, []);

  function update<K extends keyof ContactInfo>(key: K, value: ContactInfo[K]) {
    setInfo((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  async function save() {
    if (!info) return;
    setSaving(true);
    const { id, ...payload } = info;
    const { error } = await supabase.from("contact_info").update(payload).eq("id", id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Contatti aggiornati");
  }

  if (loading) return <p className="text-muted-foreground">Caricamento…</p>;
  if (!info) return <p className="text-muted-foreground italic">Nessuna informazione di contatto trovata.</p>;

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label>Indirizzo (riga 1)</Label>
          <Input value={info.address_line1} onChange={(e) => update("address_line1", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Indirizzo (riga 2)</Label>
          <Input value={info.address_line2} onChange={(e) => update("address_line2", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Telefono</Label>
          <Input value={info.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" value={info.email} onChange={(e) => update("email", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Instagram — handle visualizzato</Label>
          <Input value={info.instagram_handle} onChange={(e) => update("instagram_handle", e.target.value)} placeholder="@nomeprofilo" />
        </div>
        <div className="space-y-2">
          <Label>Instagram — URL completo</Label>
          <Input value={info.instagram_url} onChange={(e) => update("instagram_url", e.target.value)} placeholder="https://www.instagram.com/..." />
        </div>
        <div className="space-y-2">
          <Label>Indirizzo per il pin sulla mappa</Label>
          <Input value={info.maps_pin_address} onChange={(e) => update("maps_pin_address", e.target.value)} />
          <p className="text-xs text-muted-foreground">Usato per la mappa di Google. Può differire dall'indirizzo mostrato.</p>
        </div>
        <div className="space-y-2">
          <Label>Orari — riga principale</Label>
          <Input value={info.schedule_main} onChange={(e) => update("schedule_main", e.target.value)} placeholder="Lunedì – Domenica" />
        </div>
        <div className="space-y-2">
          <Label>Orari — nota</Label>
          <Input value={info.schedule_note} onChange={(e) => update("schedule_note", e.target.value)} placeholder="Giovedì chiuso" />
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={save} disabled={saving}>{saving ? "Salvataggio…" : "Salva contatti"}</Button>
      </div>
    </div>
  );
}
