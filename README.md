# Brenn Global — Supabase Edition

Brenn Global is an e-commerce website designed for premium kitchen tools. It allows customers to view products, add them to a cart, and securely check out using Razorpay. The admin dashboard allows the store owner to manage products, view orders, and edit website content.

## Tech Stack

- **Frontend:** React (Vite) for building the user interface quickly and efficiently.
- **Styling:** Tailwind CSS for rapid, responsive UI design without writing custom CSS.
- **State Management:** Zustand for lightweight global state (e.g., shopping cart).
- **Routing:** React Router (`react-router-dom`) for client-side navigation.
- **Animations:** Framer Motion for smooth page transitions and interactive elements.
- **Backend/Database:** Supabase (PostgreSQL) for storing products, website content, contact messages, and site settings.
- **Authentication:** Supabase Auth for the secure admin login.
- **Storage:** Supabase Storage for hosting product images and site media.
- **Payments:** Razorpay for secure online payment processing.
- **Hosting:** Vercel for fast, scalable frontend deployment.

## Folder Structure

```
.
├── frontend/                 # The main React application
│   ├── src/
│   │   ├── components/       # Reusable UI parts (Navbar, Footer, forms, etc.)
│   │   ├── context/          # React context providers (e.g., AuthContext)
│   │   ├── hooks/            # Custom React hooks for data fetching
│   │   ├── lib/              # API clients and Supabase configuration
│   │   ├── pages/            # Page components (Home, Checkout, Admin pages)
│   │   ├── routes/           # Routing configuration (AppRoutes, ProtectedRoute)
│   │   └── store/            # Zustand global state stores (useCartStore)
│   ├── index.html            # Entry HTML file
│   ├── vercel.json           # Vercel deployment config for React Router (SPA rewrites)
│   └── vite.config.js        # Vite bundler configuration
└── supabase/
    ├── schema.sql            # The database schema, initial data, and RLS policies
    └── functions/            # Supabase edge functions (Deno)
        ├── create-order/index.ts
        ├── verify-payment/index.ts
        └── razorpay-webhook/index.ts
```

## Purchase Flow

1. **Browse:** The customer views products on the website (`/products`).
2. **Add to Cart:** The customer adds an item to their cart, which is saved in the browser using Zustand (`useCartStore`).
3. **Checkout:** The customer proceeds to `/checkout` and enters their delivery details.
4. **Create Order (Edge Function):** When the user clicks "Pay Now", the frontend calls the `create-order` edge function. This function checks the database for correct pricing, creates an order in Razorpay, and returns the `razorpayOrderId`.
5. **Payment Window:** Razorpay's checkout modal opens for the user to complete payment.
6. **Verify Payment (Edge Function):** After successful payment, the frontend receives a payment response and calls the `verify-payment` edge function to confirm the Razorpay signature is authentic.
7. **Webhook (Edge Function):** Razorpay also sends a webhook (`razorpay-webhook`) to our server confirming the payment capture in the background, updating the order status to "paid".
8. **Confirmation:** The frontend shows a success message and clears the shopping cart.

## Database Tables

- `products`: Stores all items for sale (title, price, features, images, status).
- `website_content`: A single row containing editable content for the website (hero text, story, footer).
- `contact_messages`: Stores messages submitted by customers via the Contact page.
- `site_settings`: A single row for admin-editable settings like theme colors and site name.
- `orders`: Stores customer purchases (customer details, address, items, total, payment status, order status, and Razorpay IDs).

## Edge Functions

1. **`create-order`**: Receives cart items, calculates the correct total by taking prices directly from the `products` table on the server, creates a pending order in the database, and requests an Order ID from Razorpay.
2. **`verify-payment`**: Receives the success response from the frontend after the user pays, checks the Razorpay signature to confirm authenticity, and updates the order status to paid.
3. **`razorpay-webhook`**: Listens for Razorpay's server-to-server events (like `payment.captured`), checks the Razorpay signature, and updates the order status securely in the background, even if the user closed their browser.

## Environment Variables and Secrets

- **Frontend (Vercel):**
  - `VITE_SUPABASE_URL`: The URL of your Supabase project.
  - `VITE_SUPABASE_ANON_KEY`: The public anonymous key for Supabase.
- **Backend (Supabase Edge Function Secrets):**
  - `RAZORPAY_KEY_ID`: Your Razorpay API Key ID.
  - `RAZORPAY_KEY_SECRET`: Your Razorpay API Key Secret.
  - `RAZORPAY_WEBHOOK_SECRET`: The secret phrase used to verify webhooks from Razorpay.

*(Never commit actual values or `.env` files to Git).*

## Security Notes

- **Authentication:** New user sign-ups are turned off in Supabase Auth. 
- **Authorization:** Only admin accounts created manually can read the `orders` table.

## How to Run Locally (Windows)

1. Open Command Prompt and clone the repository.
2. Navigate to the frontend directory: `cd frontend`
3. Install dependencies: `npm install`
4. Copy the environment file: `copy .env.example .env` (and fill in your Supabase URL and Anon Key).
5. Start the development server: `npm run dev`
6. The app will be running at `http://localhost:5173`.

## How to Deploy

1. **Database:** Go to the Supabase Dashboard -> SQL Editor, and paste the contents of `supabase/schema.sql` to set up tables and security policies.
2. **Edge Functions:** Deploy the Supabase Edge Functions using the Supabase CLI: `supabase functions deploy`. The `razorpay-webhook` function must have "Verify JWT" turned OFF (deploy it with `supabase functions deploy razorpay-webhook --no-verify-jwt`), because Razorpay does not send a Supabase login token.
3. **Frontend:** Connect your GitHub repository to Vercel. Set the Root Directory to `frontend`. Vercel will automatically detect Vite and configure the build settings. Add the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` variables in Vercel's Environment Variables settings before deploying.
4. **Auth Settings:** In the Supabase Dashboard, ensure the **Site URL** and **Redirect URLs** under Authentication include your live Vercel address.

## Switching Razorpay from Test to Live

1. Log into your Razorpay Dashboard and switch to **Live Mode**.
2. Generate new Live API Keys (`RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`).
3. Update these secrets in your Supabase project using the Supabase CLI or dashboard.
4. Go to Webhooks in the Razorpay Dashboard and create a new webhook for Live Mode pointing to your `razorpay-webhook` edge function URL.
5. Create a new Webhook Secret, and update the `RAZORPAY_WEBHOOK_SECRET` in Supabase to match the new one.

## Using the Admin Panel

1. Go to `/admin/login` and log in with your Supabase Auth credentials.
2. **Products:** Add, edit, or hide products. Upload images which are stored securely in Supabase Storage.
3. **Orders:** View incoming orders, check payment status (Paid vs Pending), and update shipping statuses.
4. **Website:** Edit the hero section, company story, and footer contact info without touching code.

## Policy Pages

The policy pages are located at `/terms-and-conditions`, `/privacy-policy`, `/refund-policy`, and `/shipping-policy`.
The values for these pages are managed in `frontend/src/pages/Policy.jsx`. You can easily edit the following constants at the top of the file:
- `SHIPPING_DAYS`
- `RETURN_DAYS`
- `BUSINESS` (Name, email, phone, location)
- `UPDATED` (Date of last policy update)

## Known Limitations and Future Ideas

- **Image Optimization:** Images are served directly from Supabase Storage without on-the-fly resizing/compression (unlike Cloudinary).
- **Missing Loading States:** The checkout page could use more skeleton loaders while fetching order data.
