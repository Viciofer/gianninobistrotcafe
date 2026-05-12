CREATE TABLE public.contact_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  address_line1 text NOT NULL DEFAULT '',
  address_line2 text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  instagram_handle text NOT NULL DEFAULT '',
  instagram_url text NOT NULL DEFAULT '',
  maps_pin_address text NOT NULL DEFAULT '',
  schedule_main text NOT NULL DEFAULT '',
  schedule_note text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reads contact_info"
ON public.contact_info FOR SELECT
TO public
USING (true);

CREATE POLICY "Admins manage contact_info"
ON public.contact_info FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER contact_info_touch_updated_at
BEFORE UPDATE ON public.contact_info
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

INSERT INTO public.contact_info (
  address_line1, address_line2, phone, email,
  instagram_handle, instagram_url, maps_pin_address,
  schedule_main, schedule_note
) VALUES (
  'Via Nazionale, 34',
  '98077 Santo Stefano di Camastra (ME)',
  '0921 995719',
  'gianninobistrotcafe@gmail.com',
  '@giannino.bistrot',
  'https://www.instagram.com/giannino.bistrot/',
  'Via Nazionale, 38, 98077 Santo Stefano di Camastra ME',
  'Lunedì – Domenica',
  'Giovedì chiuso'
);