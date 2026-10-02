CREATE TABLE public.sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  icon text NOT NULL DEFAULT 'UtensilsCrossed',
  builtin boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.sections TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sections TO authenticated;
GRANT ALL ON public.sections TO service_role;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads visible sections" ON public.sections FOR SELECT USING (visible = true);
CREATE POLICY "Admins read all sections" ON public.sections FOR SELECT TO authenticated USING (has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage sections" ON public.sections FOR ALL TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_sections_updated BEFORE UPDATE ON public.sections FOR EACH ROW EXECUTE FUNCTION touch_updated_at();
INSERT INTO public.sections (slug,title,icon,builtin,sort_order) VALUES
('menu','Menù','UtensilsCrossed',true,1),('caffetteria','Caffetteria','Coffee',true,2),
('drink','Drink List','Martini',true,3),('vini','Carta dei Vini','Wine',true,4);
ALTER TABLE public.categories ALTER COLUMN section TYPE text USING section::text;
ALTER TABLE public.categories ADD CONSTRAINT categories_section_fkey FOREIGN KEY (section) REFERENCES public.sections(slug) ON UPDATE CASCADE ON DELETE CASCADE;