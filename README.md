# Brenn Global — Supabase Edition

This project has been migrated off Express + MongoDB + JWT + Cloudinary onto a
**single Supabase backend**. It is now a static React (Vite) app that talks
directly to Supabase — no server to deploy, patch, or scale.

## What changed

| Before                          | After                                   |
|----------------------------------|------------------------------------------|
| Express API (`/backend`)         | **Removed entirely**                      |
| MongoDB + Mongoose                | **Supabase Postgres** (`products`, `website_content`, `contact_messages`, `site_settings`) |
| JWT auth (`jsonwebtoken`, `bcryptjs`) | **Supabase Auth** (email/password, single admin account) |
| Cloudinary                        | **Supabase Storage** (see "Why Supabase Storage" below) |
| `axios` calls to `/api/...`       | `@supabase/supabase-js` client calls directly from React |

The `/backend` folder is gone. The whole app is now just `/frontend`, deployed
as a static site.

## Why Supabase Storage instead of Cloudinary

You asked for whichever is simpler — that's Supabase Storage:

- **One less service, one less set of API keys.** Cloudinary needs its own
  account, cloud name, API key/secret, and (previously) an Express endpoint to
  sign uploads. Supabase Storage uses the same project URL and anon key you
  already have for the database and auth.
- **Uploads happen straight from the browser.** The admin panel calls
  `supabase.storage.from('media').upload(...)` directly — no server needed to
  proxy the file or sign a request.
- **Access control lives in the same place as your data.** Storage policies
  are SQL, right next to your table RLS policies (see `supabase/schema.sql`).
- Cloudinary's extra image transforms (auto-format, on-the-fly resizing) are
  the one thing you lose. For a single-product brand site with a handful of
  product photos, that trade-off is well worth the simpler architecture. If
  you later need heavy image transformation, Supabase Storage can still sit
  behind a CDN/transform layer, or you can swap out `lib/api/storage.js` —
  it's the only file that talks to the storage layer.

## Project structure

```
frontend/
  src/
    lib/
      supabaseClient.js       # Supabase client singleton
      api/
        products.js           # Products CRUD + status toggle
        websiteContent.js     # Hero / About / Mission / Vision / Footer content
        contact.js            # Contact form submit + admin inbox
        settings.js           # Site branding/theme/analytics (admin Settings page)
        storage.js            # Image upload/list/delete (Supabase Storage)
        dashboard.js          # Admin dashboard stats
    context/AuthContext.jsx    # Supabase Auth session (replaces JWT context)
    store/                     # Zustand stores, now backed by Supabase reads
    pages/, components/        # UI is unchanged — only the data source changed
supabase/
  schema.sql                  # Full schema + RLS policies + storage bucket setup
```

## Setup

### 1. Create a Supabase project

Create a project at [supabase.com](https://supabase.com) and grab, from
**Project Settings → API**:
- Project URL
- `anon` public API key

### 2. Run the schema

Open **SQL Editor** in the Supabase Dashboard, paste the contents of
`supabase/schema.sql`, and run it. This creates:
- `products`, `website_content`, `contact_messages`, `site_settings` tables
- Row Level Security policies for all of them
- The public `media` Storage bucket + its access policies

It's safe to re-run — every statement guards against re-creation.

### 3. Create the admin account

Supabase Auth users must be created through the Auth API (so passwords are
hashed correctly), not raw SQL. In the Dashboard:

**Authentication → Users → Add User → Create new user**
- Email: your admin email
- Password: a strong password
- Toggle **Auto Confirm User** on

That's it — there's no separate "admin" role table. Every RLS write policy
in this project simply checks `to authenticated`, so the one account you
create here is automatically the site admin the moment they log in at
`/admin/login`. If you ever need a second editor, just add another user the
same way.

### 4. Configure the frontend

```bash
cd frontend
cp .env.example .env
# then edit .env:
#   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
#   VITE_SUPABASE_ANON_KEY=your_anon_key

npm install
npm run dev
```

Log in at `/admin/login` with the account you created in step 3, then use
**Website** to fill in the hero/about/contact copy and **Products** to add
your first product (the Brownie Divider, or whatever's live today).

## Deployment (Vercel)

This is now a plain static Vite build — deploy the `frontend` folder to
Vercel as-is:

1. Import the repo in Vercel, set the **root directory** to `frontend`.
2. Framework preset: **Vite** (build command `npm run build`, output `dist`).
3. Add the two environment variables from step 4 above in
   **Project Settings → Environment Variables**.
4. Deploy.

`frontend/vercel.json` includes the SPA rewrite rule so client-side routes
like `/admin/products` and `/products/:slug` don't 404 on refresh.

No backend service, no separate database host, no Cloudinary account — just
Vercel + Supabase.

## Notes on data shape

- Product `images` are stored as JSONB: `{ url, path, alt, isPrimary }[]`.
  `path` is the Supabase Storage object path (used to delete the file);
  `url` is its public URL.
- `website_content` and `site_settings` are singleton rows (`key = 'main'`)
  holding nested JSONB (`hero`, `story`, `footer` / `theme`, `analytics`) so
  the admin UI's existing nested-object code kept working unchanged.
- IDs are UUIDs (`gen_random_uuid()`), replacing Mongo's ObjectIds.
