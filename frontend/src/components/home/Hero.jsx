import { motion } from "framer-motion";
import { HiArrowDown } from "react-icons/hi";
import Button from "../ui/Button.jsx";
import useWebsiteContent from "../../hooks/useWebsiteContent.js";
import useProducts from "../../hooks/useProducts.js";
import { HeroSkeleton } from "../ui/Skeleton.jsx";

const Hero = () => {
  const { content, loading } = useWebsiteContent();
  const { featured } = useProducts();
  const hero = content?.hero;
  const heroImage = featured?.images?.find((i) => i.isPrimary)?.url || featured?.images?.[0]?.url;

  return (
    <section className="relative overflow-hidden pt-40 pb-24 sm:pt-48">
      {/* Signature ambient grid — echoes the product's own cut-guide lines */}
      <div className="cut-grid-bg pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <motion.div
        aria-hidden
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full bg-brenn-yellow/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {loading ? (
          <HeroSkeleton />
        ) : (
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="eyebrow"
              >
                Precision Kitchen Tools
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"
              >
                {hero?.heading || "Precision Brownie Divider"}
                <span className="block text-brenn-yellow">{hero?.subheading || "Designed for Professionals."}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 max-w-lg text-lg leading-relaxed text-slate"
              >
                {hero?.description ||
                  "Cut perfect, uniform brownies every time with a tool engineered for bakeries and home kitchens that demand consistency."}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Button href={hero?.primaryCtaUrl || featured?.amazonUrl || "https://www.amazon.com"}>
                  {hero?.primaryCtaLabel || "Buy on Amazon"}
                </Button>
                <Button variant="secondary" href="#featured-product">
                  {hero?.secondaryCtaLabel || "Learn More"}
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="tick-corner relative"
            >
              <div className="overflow-hidden rounded-xl2 shadow-premium">
                <img
                  src={heroImage || "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1600&auto=format&fit=crop"}
                  alt={featured?.title || "Brenn Precision Brownie Divider"}
                  className="h-[480px] w-full object-cover"
                  loading="eager"
                />
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="mt-20 flex justify-center text-slate/60"
      >
        <HiArrowDown size={22} />
      </motion.div>
    </section>
  );
};

export default Hero;
