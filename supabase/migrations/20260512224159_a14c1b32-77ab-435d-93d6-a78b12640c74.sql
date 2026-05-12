CREATE TABLE public.contact_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL DEFAULT '',
  value text NOT NULL DEFAULT '',
  href text,
  icon text NOT NULL DEFAULT 'Info',
  sort_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reads visible contact_items"
ON public.contact_items FOR SELECT
TO public
USING (visible = true);

CREATE POLICY "Admins read all contact_items"
ON public.contact_items FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins manage contact_items"
ON public.contact_items FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER contact_items_touch_updated_at
BEFORE UPDATE ON public.contact_items
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

INSERT INTO public.contact_items (label, value, href, icon, sort_order)
SELECT 'Telefono', phone, 'tel:' || regexp_replace(phone, '\s', '', 'g'), 'Phone', 0
FROM public.contact_info WHERE phone <> '' LIMIT 1;

INSERT INTO public.contact_items (label, value, href, icon, sort_order)
SELECT 'Email', email, 'mailto:' || email, 'Mail', 1
FROM public.contact_info WHERE email <> '' LIMIT 1;

INSERT INTO public.contact_items (label, value, href, icon, sort_order)
SELECT 'Instagram', instagram_handle, instagram_url, 'Instagram', 2
FROM public.contact_info WHERE instagram_handle <> '' LIMIT 1;

INSERT INTO public.contact_items (label, value, href, icon, sort_order)
SELECT 'Quando siamo aperti', schedule_main, NULL, 'Clock', 3
FROM public.contact_info WHERE schedule_main <> '' LIMIT 1;

INSERT INTO public.contact_items (label, value, href, icon, sort_order)
SELECT '', schedule_note, NULL, 'Clock', 4
FROM public.contact_info WHERE schedule_note <> '' LIMIT 1;