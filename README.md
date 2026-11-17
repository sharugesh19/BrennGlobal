# Brenn Global

E-commerce website for the Brenn Global Brownie Divider (colours Pink, Yellow, Cream). Customers browse, pick a colour, pay with Razorpay, and the owner manages products, stock and orders in a small admin panel.

Live site: https://brennglobal.in

## Tech stack

- **Frontend:** React (Vite), Tailwind CSS, Zustand (cart), React Router, Framer Motion
- **Backend and database:** Supabase (PostgreSQL, Auth, Storage, Edge Functions), on the free plan
- **Payments:** Razorpay
- **Hosting:** Firebase Hosting (project `brenn-global`, in the client's Google account)
- **Domain:** brennglobal.in (GoDaddy), pointing to Firebase Hosting

## Folder structure

```
.
├── .github/workflows/keep-supabase-awake.yml   # pings the database every 8 hours so it does not pause
├── frontend/
│   ├── public/               # sitemap.xml, robots.txt and the Google Search Console verification file
│   ├── src/
│   │   ├── components/       # Navbar, Footer, home sections, UI parts
│   │   ├── hooks/            # data fetching hooks
│   │   ├── lib/              # Supabase client and API helpers
│   │   ├── pages/            # public pages and pages/admin
│   │   ├── routes/           # AppRoutes, ProtectedRoute
│   │   └── store/            # useCartStore (Zustand)
│   ├── firebase.json         # hosting rewrite and security headers (CSP)
│   ├── .firebaserc           # Firebase project
│   └── index.html
└── supabase/
    ├── schema.sql            # database for a NEW empty project (see warning below)
    └── functions/            # edge functions: create-order, verify-payment, razorpay-webhook
```

## Purchase flow

1. The customer opens a product, picks a colour and adds it to the cart (saved in the browser).
2. At `/checkout` the customer enters delivery details and clicks Pay Now.
3. The `create-order` function reads the real price from the database, checks the colour (Pink, Yellow or Cream) and the stock, saves a pending order, and creates a Razorpay order.
4. The Razorpay window opens and the customer pays.
5. The browser calls `verify-payment`, which checks the Razorpay signature.
6. Razorpay also calls `razorpay-webhook` in the background, which checks its own signature. This covers a customer who closes the browser after paying.
7. Both call the database function `confirm_order_paid`, which marks the order paid and lowers the colour stock **only once**, even if both callers run.

## Stock per colour

- Stored in `products.colour_stock`, for example `{"Pink": 5, "Yellow": 0}`.
- A colour with **no number** is "not tracked" and never runs out.
- The owner edits the numbers in Admin, Products, Edit, "Stock by colour". Typing 0 shows "Sold out".
- Stock goes down when the payment is confirmed, not when the order is created.
- Known limit: if two customers pay for the last piece at the same moment, both payments can succeed. The owner would then refund one.

## Database tables

- `products`, `orders`, `contact_messages`, plus `website_content` and `site_settings` (small settings rows; the footer description still reads from `website_content`).
- `orders.items` holds the item list with colour and quantity.

## Environment variables and secrets

Never commit real values or `.env` files.

- **Frontend (`frontend/.env`, used only when building on the developer's computer):** `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. See `.env.example`.
- **Supabase Edge Function secrets (Supabase Dashboard, Edge Functions, Secrets):** `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`.
- **GitHub Actions secrets (keep-alive job):** `SUPABASE_URL`, `SUPABASE_ANON_KEY`. Re-add them if the repository is moved to a new owner.

## How to run locally (Windows)

1. `cd frontend`
2. `npm install`
3. `copy .env.example .env` and fill in the two Supabase values
4. `npm run dev`, then open http://localhost:5173

Note: localhost uses the real database. Anything saved in the admin panel on localhost is saved for real.

## How to deploy the website

From the `frontend` folder:

```
npm run build
npx firebase deploy --only hosting --project brenn-global
```

Always keep `--project brenn-global` and check that the first line says `Deploying to 'brenn-global'`.

## How to update an edge function

The functions have been updated by pasting the code into the Supabase Dashboard: Edge Functions, the function, the Code tab, then Deploy updates. Then paste the same code into `supabase/functions/<name>/index.ts` so GitHub matches what is live. The Supabase CLI (`supabase functions deploy`) can be used instead.

`razorpay-webhook` must have **Verify JWT turned OFF**, because Razorpay does not send a Supabase login token.

## Database setup for a NEW project

Run `supabase/schema.sql` once in the Supabase SQL Editor of a new, empty project. It creates the tables, security rules, the stock function and the table permissions (Supabase no longer grants access to new tables automatically since 30 October 2026).

**Do not run it again on the live project.** The live database already has everything, and the orders section of the file is not safe to re-run.

## Security notes

- New user sign-ups are turned **OFF** in Supabase Auth. Keep it that way.
- The database rules treat any signed-in user as the admin. This is safe only while sign-ups are off. Admin accounts are created by hand in Supabase, Authentication, Users.
- Prices, colours and stock are always checked on the server in `create-order`, never trusted from the browser.
- The service role key is used only inside edge functions, never in the frontend.

## Going live with Razorpay (test to live)

1. In Razorpay, switch to Live mode and generate live keys.
2. Put `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` into the Supabase secrets.
3. In Razorpay (Live mode), create a new webhook that points to the `razorpay-webhook` function URL, with the events `order.paid` and `payment.captured` and a new secret. Put the same secret in `RAZORPAY_WEBHOOK_SECRET`.
4. Make one small real payment, then refund it.

Refunds are done by hand in the Razorpay dashboard. Marking an order "Cancelled" in the admin panel does **not** refund the customer.

## Admin panel

Log in at `/admin/login`. The admin has four pages:

- **Dashboard:** product and enquiry counts.
- **Products:** add and edit products, images, price, status and stock by colour.
- **Orders:** see paid orders (tick "Show unpaid attempts" to see unfinished ones), change the order status, and download the orders as a CSV file. Download it now and then as a backup.
- **Enquiries:** messages from the Contact page.

## Things that live in the code, not the admin panel

- Policy pages: `frontend/src/pages/Policy.jsx` (constants at the top such as `SHIPPING_DAYS` and `RETURN_DAYS`).
- Footer contact details and the Instagram link: `frontend/src/components/layout/Footer.jsx` (`INSTAGRAM_URL`; empty means the icon is hidden).
- Colours Pink, Yellow, Cream: `ProductDetail.jsx` and the `create-order` function. Change both if a colour is added.
- Home page price card and the bulk-order WhatsApp line: `frontend/src/components/home/Hero.jsx`.

## SEO

- `frontend/public/sitemap.xml` lists the public pages. Add new pages there.
- `frontend/public/robots.txt` blocks `/admin` and `/checkout`.
- The file `frontend/public/google...html` verifies the site in Google Search Console. **Never delete it.**

## Known limitations

- No order confirmation emails and no new-order alert are sent yet. Check the Orders page.
- The delivery charge is not added at checkout yet.
- The free Supabase plan has very little backup. Download the orders CSV regularly.
- Product images are served as uploaded, without automatic resizing.