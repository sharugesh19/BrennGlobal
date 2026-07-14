-- ============================================================================
-- Brenn Global — Supabase schema
-- Run this once in the Supabase SQL Editor (Dashboard > SQL Editor > New query)
-- Safe to re-run: uses IF NOT EXISTS / DROP POLICY IF EXISTS guards throughout.
-- ============================================================================

-- Needed for gen_random_uuid()
create extension if not exists "pgcrypto";

-- ============================================================================
-- 1. PRODUCTS
-- ============================================================================

create table if not exists public.products (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  slug            text not null unique,
  tagline         text,
  description     text not null default '',
  category        text default 'Kitchen Tools',

  features        jsonb not null default '[]'::jsonb,       -- string[]
  applications    jsonb not null default '[]'::jsonb,       -- string[]
  specifications  jsonb not null default '[]'::jsonb,       -- { label, value }[]
  images          jsonb not null default '[]'::jsonb,       -- { url, path, alt, isPrimary }[]

  amazon_url      text,
  price           numeric(10, 2),
  currency        text default 'INR',

  status          text not null default 'draft'
                    check (status in ('published', 'draft', 'coming-soon', 'hidden')),
  is_featured     boolean not null default false,
  sort_order      integer not null default 0,

  seo             jsonb not null default '{"metaTitle": "", "metaDescription": "", "keywords": []}'::jsonb,

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists idx_products_status_sort on public.products (status, sort_order);
create index if not exists idx_products_slug on public.products (slug);

-- ============================================================================
-- 2. WEBSITE CONTENT (singleton row, key = 'main')
-- ============================================================================

create table if not exists public.website_content (
  key         text primary key default 'main',

  hero        jsonb not null default '{
    "heading": "Precision Brownie Divider",
    "subheading": "Designed for Professionals.",
    "description": "Cut perfect, uniform brownies every time with a tool engineered for bakeries and home kitchens that demand consistency.",
    "primaryCtaLabel": "Buy on Amazon",
    "primaryCtaUrl": "https://www.amazon.com",
    "secondaryCtaLabel": "Learn More",
    "bannerImage": ""
  }'::jsonb,

  story       jsonb not null default '{
    "heading": "Engineered in pursuit of the perfect cut.",
    "mission": "To bring precision-engineered kitchen tools to every professional and home baker who refuses to compromise on consistency.",
    "vision": "To become the most trusted name in premium bakeware and kitchen tools worldwide.",
    "body": "Brenn Global started with a simple frustration: uneven, inconsistent cuts were costing bakeries time, product, and presentation."
  }'::jsonb,

  footer      jsonb not null default '{
    "description": "Premium precision kitchen tools, engineered for professionals.",
    "phone": "+1 (555) 123-4567",
    "email": "hello@brennglobal.com",
    "address": "Industrial Ave, Suite 400, Los Angeles, CA",
    "social": {
      "instagram": "https://instagram.com",
      "facebook": "https://facebook.com",
      "youtube": "https://youtube.com",
      "linkedin": "https://linkedin.com"
    },
    "whatsappNumber": "15551234567"
  }'::jsonb,

  updated_at  timestamptz not null default now()
);

-- Seed the singleton row if it doesn't exist yet.
insert into public.website_content (key)
values ('main')
on conflict (key) do nothing;

-- ============================================================================
-- 3. CONTACT MESSAGES
-- ============================================================================

create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  subject     text,
  message     text not null,
  status      text not null default 'new'
                check (status in ('new', 'read', 'replied', 'archived')),
  created_at  timestamptz not null default now()
);

create index if not exists idx_contact_messages_created_at on public.contact_messages (created_at desc);

-- ============================================================================
-- 4. SITE SETTINGS (singleton row, key = 'main') — backs the admin
--    Settings page (branding / theme / analytics IDs).
-- ============================================================================

create table if not exists public.site_settings (
  key         text primary key default 'main',
  site_name   text not null default 'Brenn Global',
  logo_url    text default '',
  theme       jsonb not null default '{"primaryColor": "#FFC107", "accentColor": "#D4AF37"}'::jsonb,
  analytics   jsonb not null default '{"googleAnalyticsId": "", "metaPixelId": ""}'::jsonb,
  updated_at  timestamptz not null default now()
);

insert into public.site_settings (key)
values ('main')
on conflict (key) do nothing;

-- ============================================================================
-- updated_at auto-touch trigger (keeps updated_at fresh on every UPDATE)
-- ============================================================================

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_products_updated_at on public.products;
create trigger trg_products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

drop trigger if exists trg_website_content_updated_at on public.website_content;
create trigger trg_website_content_updated_at
  before update on public.website_content
  for each row execute function public.set_updated_at();

drop trigger if exists trg_site_settings_updated_at on public.site_settings;
create trigger trg_site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY
--
-- Model: single admin account, authenticated via Supabase Auth. Any signed-in
-- user is treated as the admin (there's only ever one). Everything else
-- (the public website + contact form) uses the anon key and is read-only
-- except for inserting contact messages.
-- ============================================================================

alter table public.products enable row level security;
alter table public.website_content enable row level security;
alter table public.contact_messages enable row level security;
alter table public.site_settings enable row level security;

-- ---- products -----------------------------------------------------------

drop policy if exists "Public can read published products" on public.products;
create policy "Public can read published products"
  on public.products for select
  to anon, authenticated
  using (status in ('published', 'coming-soon'));

drop policy if exists "Admin can read all products" on public.products;
create policy "Admin can read all products"
  on public.products for select
  to authenticated
  using (true);

drop policy if exists "Admin can insert products" on public.products;
create policy "Admin can insert products"
  on public.products for insert
  to authenticated
  with check (true);

drop policy if exists "Admin can update products" on public.products;
create policy "Admin can update products"
  on public.products for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin can delete products" on public.products;
create policy "Admin can delete products"
  on public.products for delete
  to authenticated
  using (true);

-- ---- website_content ------------------------------------------------------

drop policy if exists "Public can read website content" on public.website_content;
create policy "Public can read website content"
  on public.website_content for select
  to anon, authenticated
  using (true);

drop policy if exists "Admin can update website content" on public.website_content;
create policy "Admin can update website content"
  on public.website_content for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin can insert website content" on public.website_content;
create policy "Admin can insert website content"
  on public.website_content for insert
  to authenticated
  with check (true);

-- ---- contact_messages -----------------------------------------------------

drop policy if exists "Public can submit contact messages" on public.contact_messages;
create policy "Public can submit contact messages"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admin can read contact messages" on public.contact_messages;
create policy "Admin can read contact messages"
  on public.contact_messages for select
  to authenticated
  using (true);

drop policy if exists "Admin can update contact messages" on public.contact_messages;
create policy "Admin can update contact messages"
  on public.contact_messages for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin can delete contact messages" on public.contact_messages;
create policy "Admin can delete contact messages"
  on public.contact_messages for delete
  to authenticated
  using (true);

-- ---- site_settings ---------------------------------------------------------

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
  on public.site_settings for select
  to anon, authenticated
  using (true);

drop policy if exists "Admin can update site settings" on public.site_settings;
create policy "Admin can update site settings"
  on public.site_settings for update
  to authenticated
  using (true)
  with check (true);

-- ============================================================================
-- 5. STORAGE — public "media" bucket for product/site images
-- ============================================================================

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Anyone can view images (public bucket + public read policy) — needed so
-- product photos render on the public website without auth.
drop policy if exists "Public can view media" on storage.objects;
create policy "Public can view media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

-- Only the signed-in admin can upload/replace/delete files.
drop policy if exists "Admin can upload media" on storage.objects;
create policy "Admin can upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

drop policy if exists "Admin can update media" on storage.objects;
create policy "Admin can update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media')
  with check (bucket_id = 'media');

drop policy if exists "Admin can delete media" on storage.objects;
create policy "Admin can delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');

-- ============================================================================
-- 6. ADMIN USER
--
-- Supabase Auth users can't be created via plain SQL (passwords must go
-- through Supabase's auth API so they're hashed correctly). Create the
-- single admin account from the Dashboard instead:
--
--   Authentication > Users > Add User > Create new user
--     - Email: your admin email
--     - Password: a strong password
--     - Auto Confirm User: ON
--
-- Or via the Supabase CLI / Management API:
--   supabase auth admin create-user --email admin@brennglobal.com --password '...' --email-confirm
--
-- Because every RLS "admin" policy above simply checks `to authenticated`,
-- that one user is automatically treated as the site admin the moment they
-- log in from /admin/login — no extra role table needed for a single-admin site.
-- ============================================================================
