import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../ui/Button.jsx";
import { ProductCardSkeleton } from "../ui/Skeleton.jsx";
import useProducts from "../../hooks/useProducts.js";

const FeaturedProduct = () => {
  const { featured, loading } = useProducts();
  const [activeImage, setActiveImage] = useState(0);

  if (loading) {
    return (
      <section id="featured-product" className="section-pad mx-auto max-w-7xl">
        <ProductCardSkeleton />
      </section>
    );
  }

  if (!featured) return null;

  const images = featured.images?.length ? featured.images : [];

  return (
    <section id="featured-product" className="section-pad mx-auto max-w-7xl scroll-mt-24">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="eyebrow"
      >
        Featured Product
      </motion.span>

      <div className="mt-4 grid grid-cols-1 gap-16 lg:grid-cols-2">
        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="group tick-corner overflow-hidden rounded-xl2 bg-cloud shadow-premium">
            <motion.img
              key={activeImage}
              initial={{ opacity: 0.4, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              src={images[activeImage]?.url}
              alt={images[activeImage]?.alt || featured.title}
              className="h-[420px] w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
            />
          </div>
          {images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {images.map((img, i) => (
                <button
                  key={img.path || img.url}
                  onClick={() => setActiveImage(i)}
                  className={`h-20 w-20 overflow-hidden rounded-lg border-2 transition-colors ${
                    activeImage === i ? "border-brenn-yellow" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img.url} alt={img.alt} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{featured.title}</h2>
          {featured.tagline && <p className="mt-2 font-display text-brenn-gold">{featured.tagline}</p>}
          <p className="mt-5 leading-relaxed text-slate">{featured.description}</p>

          {featured.features?.length > 0 && (
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {featured.features.slice(0, 6).map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-ink/80">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brenn-yellow" />
                  {f}
                </li>
              ))}
            </ul>
          )}

          {featured.specifications?.length > 0 && (
            <div className="mt-8 rounded-xl2 border border-ink/8 bg-cloud p-6">
              <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-slate">Specifications</h4>
              <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {featured.specifications.map((s) => (
                  <div key={s.label} className="flex justify-between border-b border-ink/8 pb-2 text-sm">
                    <dt className="text-slate">{s.label}</dt>
                    <dd className="font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={featured.amazonUrl || "https://www.amazon.com"}>Buy on Amazon</Button>
            <Link to={`/products/${featured.slug}`} className="btn-secondary">
              View Full Details
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
