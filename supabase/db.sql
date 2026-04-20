CREATE TABLE IF NOT EXISTS certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cert_number TEXT UNIQUE NOT NULL,
  recipient_name TEXT NOT NULL,
  event_name TEXT NOT NULL,
  issue_date DATE DEFAULT CURRENT_DATE,
  signature TEXT,        
  image_url TEXT,        
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" 
ON certificates FOR SELECT USING (true);

CREATE POLICY "Enable all access for authenticated users" 
ON certificates FOR ALL TO authenticated USING (true) WITH CHECK (true);


INSERT INTO storage.buckets (id, name, public) 
VALUES ('certificates', 'certificates', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'certificates' );

CREATE POLICY "Admin Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'certificates' );

CREATE POLICY "Admin Delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'certificates' );


CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_certificates_updated_at
BEFORE UPDATE ON certificates
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();
