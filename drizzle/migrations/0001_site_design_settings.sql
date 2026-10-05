CREATE TABLE public.site_design (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_design TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_design TO authenticated;
GRANT ALL ON public.site_design TO service_role;
ALTER TABLE public.site_design ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads site design" ON public.site_design FOR SELECT TO public USING (true);
CREATE POLICY "Admins manage site design" ON public.site_design FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));