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
  const productImage = featured?.images?.find((i) => i.isPrimary)?.url || featured?.images?.[0]?.url;
  const heroImage = hero?.bannerImage || productImage;

  return (
    <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24 lg:pt-32">
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
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
            <div className="w-full lg:flex-1">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="eyebrow flex items-center gap-2 text-xs sm:text-sm"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brenn-yellow" />
                Precision Kitchen Tools
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-3 text-4xl font-extrabold leading-[1.12] tracking-tight sm:mt-4 sm:text-5xl sm:leading-[1.08] lg:text-6xl lg:leading-[1.05]"
              >
                {hero?.heading || "Precision Brownie Divider"}
                <span className="block text-brenn-yellow">{hero?.subheading || "Designed for Professionals."}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 max-w-lg text-base leading-relaxed text-slate sm:mt-6 sm:text-lg"
              >
                {hero?.description ||
                  "Cut perfect, uniform brownies every time with a tool engineered for bakeries and home kitchens that demand consistency."}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
              >
                <Button className="w-full text-center sm:w-auto" href={hero?.primaryCtaUrl || featured?.amazonUrl || "https://www.amazon.com"}>
                  {hero?.primaryCtaLabel || "Buy on Amazon"}
                </Button>
                <Button className="w-full text-center sm:w-auto" variant="secondary" href="/about">
                  {hero?.secondaryCtaLabel || "Learn More"}
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="tick-corner relative w-full lg:flex-1"
            >
              <div className="overflow-hidden rounded-2xl shadow-premium ring-1 ring-black/5">
                <img
                  src={heroImage || "https://images.unsplash.com/photo-1615796701805-2094ac54bbf9?q=80&w=1600&auto=format&fit=crop"}
                  alt={hero?.heading || featured?.title || "Brenn Global bakery tools"}
                  className="h-[300px] w-full rounded-2xl object-cover sm:h-[380px] lg:h-[480px]"
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