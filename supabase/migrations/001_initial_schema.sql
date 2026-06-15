-- EventTLS — Schéma initial
-- Source : cahier_de_charge.md §4

-- Profils utilisateurs (extension de auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'organizer')),
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Événements (source officielle ou créés par organisateurs)
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  date_start TIMESTAMPTZ NOT NULL,
  date_end TIMESTAMPTZ,
  location_name TEXT,
  address TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  category TEXT,
  capacity INTEGER,
  price DECIMAL(10,2) DEFAULT 0,
  image_url TEXT,
  organizer_id UUID REFERENCES profiles(id),
  source TEXT NOT NULL DEFAULT 'user' CHECK (source IN ('toulouse_api', 'user')),
  external_id TEXT UNIQUE,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inscriptions
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'waitlist')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, event_id)
);

-- Favoris
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, event_id)
);

-- Vue enrichie pour le dashboard organisateur
CREATE VIEW events_with_stats AS
SELECT
  e.*,
  COUNT(DISTINCT r.id) FILTER (WHERE r.status = 'confirmed') AS registrations_count,
  COUNT(DISTINCT f.id) AS favorites_count
FROM events e
LEFT JOIN registrations r ON r.event_id = e.id
LEFT JOIN favorites f ON f.event_id = e.id
GROUP BY e.id;

-- Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- events
CREATE POLICY "Lecture publique events" ON events FOR SELECT USING (true);
CREATE POLICY "Organisateur peut créer events" ON events FOR INSERT
  WITH CHECK (auth.uid() = organizer_id);
CREATE POLICY "Organisateur peut modifier ses events" ON events FOR UPDATE
  USING (auth.uid() = organizer_id);

-- registrations
CREATE POLICY "User voit ses inscriptions" ON registrations FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "User peut s'inscrire" ON registrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "User peut annuler inscription" ON registrations FOR UPDATE
  USING (auth.uid() = user_id);

-- favorites
CREATE POLICY "User voit ses favoris" ON favorites FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "User peut ajouter favori" ON favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "User peut retirer favori" ON favorites FOR DELETE
  USING (auth.uid() = user_id);

-- profiles
CREATE POLICY "Lecture publique profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "User modifie son profil" ON profiles FOR UPDATE
  USING (auth.uid() = id);
CREATE POLICY "User crée son profil" ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Trigger : créer un profil à l'inscription
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
