# Stuvanta

Student discount membership platform, launching at the University of Melbourne
(Parkville). This is **Phase 1**: a pre-launch site that collects student
waitlist signups and venue leads, before any payment code exists.

If you've never used Next.js before: it's a framework for building websites
with React, where files inside `src/app/` automatically become pages and API
routes. You don't need to know React deeply to follow this README — just
enough to edit text in files when asked.

## What's in Phase 1

- A landing page with the pitch, the break-even maths, placeholder sample
  venues, and an FAQ.
- A waitlist form (email + campus + course year), storing whether the email
  is a `.edu.au` address without rejecting the ones that aren't.
- A `/venues` page with a form for venues to register interest, which emails
  us on submission.
- A password-protected `/admin` page listing both, with CSV export.
- Confirmation emails via [Resend](https://resend.com), sent from their
  shared sandbox address (`onboarding@resend.dev`) so no domain purchase or
  DNS setup is required yet.

Phase 2 (accounts, payments, the venue directory, redemption codes) is not
started. Don't build it until Phase 1 is deployed and confirmed working.

## 1. Prerequisites

- [Node.js](https://nodejs.org) 20.9 or later (check with `node --version`)
- A free [Supabase](https://supabase.com) account
- A free [Resend](https://resend.com) account
- A free [Vercel](https://vercel.com) account (for deploying)
- A [GitHub](https://github.com) account (Vercel deploys from a git repo)

## 2. Install dependencies

From the project folder:

```bash
npm install
```

## 3. Set up Supabase (the database)

1. Go to [supabase.com](https://supabase.com), sign in, and click **New
   project**. Any name/region is fine (pick a region close to Australia if
   offered, e.g. Sydney).
2. Once it's created, open **SQL Editor** in the left sidebar, click **New
   query**, paste in the entire contents of
   [`supabase/schema.sql`](supabase/schema.sql), and click **Run**. This
   creates the two tables (`waitlist_signups`, `venue_leads`) and locks them
   down so the public site can only insert rows, never read them back.
3. Open **Project Settings > API**. You'll need three values from here in
   the next step:
   - **Project URL**
   - **anon / public** key
   - **service_role** key (keep this one secret — it has full access)

## 4. Set up Resend (confirmation emails)

1. Go to [resend.com](https://resend.com) and sign up.
2. Go to **API Keys** and create one. Copy it.
3. That's it for now — you can send from `onboarding@resend.dev`
   immediately. Later, once you own a domain, verify it in Resend and set
   `EMAIL_FROM` to an address on that domain instead.

## 5. Configure environment variables

Copy the example file:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in:

| Variable | Where it comes from |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API (secret) |
| `RESEND_API_KEY` | Resend → API Keys |
| `EMAIL_FROM` | Leave blank to use `onboarding@resend.dev` |
| `ADMIN_NOTIFICATION_EMAIL` | The email address venue leads get sent to (e.g. your own) |
| `ADMIN_PASSWORD` | Make up a password for the shared `/admin` login |
| `ADMIN_SESSION_SECRET` | Any long random string — generate one with `openssl rand -hex 32`, or just mash the keyboard for 40+ characters |

`.env.local` is already in `.gitignore` — it will never be committed.

## 6. Run it locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Resize your browser
narrow (or open dev tools' device toolbar) to check the mobile layout —
that's what most real visitors will see.

Try `/admin/login` with the password you set in step 5, then `/admin` to see
the (empty, until someone signs up) waitlist and venue tables.

## 7. Deploy to Vercel

1. Create a new GitHub repository and push this project to it:

   ```bash
   git add -A
   git commit -m "Phase 1: pre-launch site"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. Go to [vercel.com/new](https://vercel.com/new), import that GitHub repo.
3. Before the first deploy, add every variable from `.env.local` into
   Vercel's **Environment Variables** section (same names, same values).
4. Click **Deploy**. Vercel gives you a live URL
   (`your-project.vercel.app`) — every future push to `main` redeploys it
   automatically.

Vercel's free tier and Supabase's free tier are both sufficient at this
scale — expect close to $0/month until membership (Phase 2) launches.

## Project structure

```
src/
  app/
    page.tsx              landing page
    venues/page.tsx        venue interest form
    privacy/page.tsx       privacy policy
    admin/                 password-protected dashboard + CSV export
    actions/                Server Actions (form submit handlers)
  components/               UI pieces (forms, hero, FAQ, etc.)
  lib/
    config.ts               campus name, price, dropdown options — edit copy here
    sample-venues.ts         PLACEHOLDER venue data shown on the landing page
    supabase.ts, resend.ts   API clients
    validation.ts            form validation + the .edu.au check
    admin-session.ts         signs/verifies the /admin login cookie
  proxy.ts                   gatekeeper: redirects unauthenticated /admin
                              requests to /admin/login (Next.js 16 renamed
                              "middleware" to "proxy")
supabase/schema.sql          run this once in the Supabase SQL Editor
```

## Notes on decisions worth knowing about

- **Sample venues are fake.** `src/lib/sample-venues.ts` is placeholder data
  clearly labelled "Example" in the UI. Do not put a real venue's name there
  without their written agreement to the offer shown — the site is public
  and implies a signed-up partner.
- **Light mode only, on purpose.** Two people maintaining a second dark
  palette isn't worth it, and the design needs to stay legible at an O-Week
  stall in daylight regardless of device settings.
- **Admin auth is a single shared password**, not per-person accounts — this
  matches the "simple, password-protected list" ask in the spec. It's meant
  for two founders, not a team. Revisit if that changes.
- **The footer says "not affiliated with or endorsed by any university."**
  This is deliberate: without it, the site could read as an official
  university service, which would be misleading advertising under the
  Australian Consumer Law.

## What's next

Phase 2 (student accounts, Stripe subscriptions, the venue directory,
rotating redemption codes, the venue portal, the full admin dashboard) is
scoped in the original brief but **not started**. Don't begin it until
Phase 1 is deployed, tested on a real phone, and explicitly confirmed.
