-- Create genes table
CREATE TABLE IF NOT EXISTS public.genes (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  gene_symbol TEXT NOT NULL,
  gene_name TEXT NOT NULL,
  chromosome TEXT NOT NULL,
  position BIGINT NOT NULL,
  description TEXT NOT NULL,
  associated_diseases TEXT NOT NULL,
  protein_function TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create symptoms table
CREATE TABLE IF NOT EXISTS public.symptoms (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  symptom_name TEXT NOT NULL,
  body_system TEXT NOT NULL,
  severity TEXT NOT NULL,
  description TEXT NOT NULL,
  common_associations TEXT NOT NULL,
  diagnostic_methods TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create treatments table
CREATE TABLE IF NOT EXISTS public.treatments (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  treatment_name TEXT NOT NULL,
  treatment_type TEXT NOT NULL,
  description TEXT NOT NULL,
  target_conditions TEXT NOT NULL,
  effectiveness_rating INTEGER NOT NULL,
  side_effects TEXT NOT NULL,
  contraindications TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE public.genes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treatments ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous read access
CREATE POLICY "Allow anonymous read access to genes" 
  ON public.genes FOR SELECT 
  USING (true);

CREATE POLICY "Allow anonymous read access to symptoms" 
  ON public.symptoms FOR SELECT 
  USING (true);

CREATE POLICY "Allow anonymous read access to treatments" 
  ON public.treatments FOR SELECT 
  USING (true);