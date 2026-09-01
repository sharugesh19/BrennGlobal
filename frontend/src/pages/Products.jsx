import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useProducts from "../hooks/useProducts.js";
import SEO from "../components/seo/SEO.jsx";
import { ProductCardSkeleton } from "../components/ui/Skeleton.jsx";

const currencySymbol = (currency) => {
  if (currency === "INR") return "₹";
  if (currency === "USD") return "$";
  return `${currency} `;
};

const Products = () => {
  const { published, comingSoon, loading } = useProducts();

  return (
    <div className="mx-auto max-w-7xl px-6 py-40 sm:px-10 lg:px-16">
      <SEO title="Products" description="Explore Brenn Global's precision kitchen tools." path="/products" />

      <span className="eyebrow">Our Products</span>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Precision tools, built to last.</h1>

      {loading ? (
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : published.length === 0 ? (
        <p className="mt-10 text-slate">No products are live yet — check back soon.</p>
      ) : (
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {published.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link
                to={`/products/${p.slug}`}
                className="group block overflow-hidden rounded-xl2 border border-ink/8 bg-white shadow-sm transition-shadow duration-300 hover:shadow-premium"
              >
                <div className="flex h-64 w-full items-center justify-center overflow-hidden bg-cloud">
                  {p.images?.[0]?.url ? (
                    <img
                      src={p.images[0].url}
                      alt={p.images[0].alt || p.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="font-mono text-4xl text-ink/10">?</span>
                  )}
                </div>
                <div className="p-6">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-slate">{p.category}</span>
                  <h3 className="mt-1 font-display text-xl font-semibold">{p.title}</h3>
                  {p.tagline && <p className="mt-1 text-sm text-brenn-gold">{p.tagline}</p>}
                  {p.price && (
                    <p className="mt-3 font-display font-bold">
                      {currencySymbol(p.currency)}
                      {p.price}
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {comingSoon.length > 0 && (
        <div className="mt-24">
          <span className="eyebrow">Coming Soon</span>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {comingSoon.map((p) => (
              <div key={p.id} className="rounded-xl2 border border-ink/8 bg-cloud p-5">
                <p className="font-mono text-[11px] uppercase tracking-widest text-slate">{p.category}</p>
                <h4 className="mt-1 font-display font-semibold">{p.title}</h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;