CREATE TABLE public.home_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_html text NOT NULL DEFAULT '',
  body_html text NOT NULL DEFAULT '',
  carousel_enabled boolean NOT NULL DEFAULT false,
  carousel_interval integer NOT NULL DEFAULT 5,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.home_content TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.home_content TO authenticated;
GRANT ALL ON public.home_content TO service_role;
ALTER TABLE public.home_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads home_content" ON public.home_content FOR SELECT USING (true);
CREATE POLICY "Admins manage home_content" ON public.home_content FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER home_content_touch BEFORE UPDATE ON public.home_content FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.home_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  path text,
  alt text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.home_images TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.home_images TO authenticated;
GRANT ALL ON public.home_images TO service_role;
ALTER TABLE public.home_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads visible home_images" ON public.home_images FOR SELECT USING (visible = true);
CREATE POLICY "Admins manage home_images" ON public.home_images FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  event_date date NOT NULL,
  event_time text NOT NULL DEFAULT '',
  image_url text,
  image_path text,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.events TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.events TO authenticated;
GRANT ALL ON public.events TO service_role;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads visible upcoming events" ON public.events FOR SELECT USING (visible = true AND event_date >= CURRENT_DATE);
CREATE POLICY "Admins manage events" ON public.events FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE POLICY "Admins read home-media" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'home-media' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins upload home-media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'home-media' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update home-media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'home-media' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete home-media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'home-media' AND public.has_role(auth.uid(),'admin'));