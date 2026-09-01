import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getProductBySlug } from "../lib/api/products.js";
import SEO from "../components/seo/SEO.jsx";
import Button from "../components/ui/Button.jsx";
import { ProductCardSkeleton } from "../components/ui/Skeleton.jsx";

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setNotFound(false);
    getProductBySlug(slug)
      .then((data) => {
        if (ignore) return;
        if (!data || data.status === "hidden") {
          setNotFound(true);
        } else {
          setProduct(data);
          setActiveImage(0);
        }
      })
      .catch(() => !ignore && setNotFound(true))
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-40 sm:px-10 lg:px-16">
        <ProductCardSkeleton />
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-40 text-center">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <p className="mt-3 text-slate">This product may have moved or is no longer available.</p>
        <Link to="/" className="btn-dark mt-8 inline-flex">Back to Home</Link>
      </div>
    );
  }

  const images = product.images || [];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: images.map((i) => i.url),
    brand: { "@type": "Brand", name: "Brenn Global" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency || "USD",
      url: product.amazonUrl,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-40 sm:px-10 lg:px-16">
      <SEO
        title={product.seo?.metaTitle || product.title}
        description={product.seo?.metaDescription || product.description}
        path={`/products/${product.slug}`}
        image={images[0]?.url}
        schema={schema}
      />

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="tick-corner overflow-hidden rounded-xl2 bg-cloud shadow-premium">
            <motion.img
              key={activeImage}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              src={images[activeImage]?.url}
              alt={images[activeImage]?.alt || product.title}
              className="h-[460px] w-full object-cover"
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

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <span className="eyebrow">{product.category}</span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight">{product.title}</h1>
          {product.tagline && <p className="mt-2 font-display text-brenn-gold">{product.tagline}</p>}
          <p className="mt-5 leading-relaxed text-slate">{product.description}</p>

          {product.price && (
            <p className="mt-6 font-display text-2xl font-bold">
              {product.currency === "INR" ? "₹" : product.currency === "USD" ? "$" : product.currency + " "}
              {product.price}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-4">
            <Button href={product.amazonUrl || "https://www.amazon.com"}>Buy on Amazon</Button>
          </div>

          {product.features?.length > 0 && (
            <div className="mt-10">
              <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-slate">Features</h4>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brenn-yellow" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.applications?.length > 0 && (
            <div className="mt-10">
              <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-slate">Applications</h4>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((a) => (
                  <span key={a} className="rounded-full bg-cloud px-4 py-2 text-xs font-medium text-ink/70">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.specifications?.length > 0 && (
            <div className="mt-10 rounded-xl2 border border-ink/8 bg-cloud p-6">
              <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-slate">Specifications</h4>
              <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {product.specifications.map((s) => (
                  <div key={s.label} className="flex justify-between border-b border-ink/8 pb-2 text-sm">
                    <dt className="text-slate">{s.label}</dt>
                    <dd className="font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;