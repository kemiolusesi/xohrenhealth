create type user_role as enum ('patient', 'doctor', 'admin', 'superadmin');
create type language_code as enum ('en', 'ha', 'yo', 'ig', 'pcm');
create type consultation_type as enum ('video', 'voice', 'chat');
create type consultation_status as enum ('pending', 'confirmed', 'completed', 'cancelled');
create type urgency_level as enum ('routine', 'soon', 'urgent');
create type chronic_condition as enum ('diabetes', 'hypertension', 'sickle_cell', 'asthma');

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null,
  full_name text not null,
  phone text,
  email text,
  language_preference language_code default 'en',
  avatar_url text,
  created_at timestamptz not null default now()
);

create table public.doctors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  specialty text not null,
  years_experience integer not null default 0,
  bio text,
  license_url text,
  consultation_fee_30min numeric(12, 2) not null,
  consultation_fee_60min numeric(12, 2) not null,
  languages_spoken language_code[] not null default array['en']::language_code[],
  is_verified boolean not null default false,
  is_active boolean not null default false,
  rating numeric(2, 1) not null default 0
);

create table public.patients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  date_of_birth date,
  gender text,
  state_of_origin text,
  chronic_conditions text[] not null default '{}',
  blood_group text,
  genotype text
);

create table public.availability (
  id uuid primary key default gen_random_uuid(),
  doctor_id uuid not null references public.doctors(id) on delete cascade,
  date date not null,
  start_time time not null,
  end_time time not null,
  is_booked boolean not null default false
);

create table public.consultations (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  doctor_id uuid not null references public.doctors(id) on delete cascade,
  scheduled_at timestamptz not null,
  duration_minutes integer not null,
  type consultation_type not null,
  status consultation_status not null default 'pending',
  amount numeric(12, 2) not null,
  care_code_used text,
  notes_summary text
);

create table public.care_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  doctor_id uuid not null references public.doctors(id) on delete cascade,
  patient_id uuid not null references public.patients(id) on delete cascade,
  original_consultation_id uuid references public.consultations(id) on delete set null,
  discount_percent integer not null,
  expires_at timestamptz not null,
  is_used boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.triage_sessions (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references public.patients(id) on delete set null,
  messages jsonb not null default '[]'::jsonb,
  recommended_specialty text,
  urgency_level urgency_level,
  created_at timestamptz not null default now()
);

create table public.health_records (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  title text not null,
  type text not null,
  file_url text,
  created_at timestamptz not null default now(),
  doctor_id uuid references public.doctors(id) on delete set null
);

create table public.maternal_plans (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  start_date date not null,
  due_date date,
  assigned_obgyn_id uuid references public.doctors(id) on delete set null,
  assigned_nutritionist_id uuid references public.doctors(id) on delete set null,
  assigned_nurse_id uuid references public.doctors(id) on delete set null,
  plan_status text not null default 'active',
  week_number integer not null default 1
);

create table public.chronic_plans (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  condition chronic_condition not null,
  assigned_doctor_id uuid references public.doctors(id) on delete set null,
  start_date date not null,
  plan_status text not null default 'active',
  last_checkin_at timestamptz
);
