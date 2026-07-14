import { motion } from "framer-motion";
import useProducts from "../../hooks/useProducts.js";

// Static fallback categories shown until the admin adds real "coming-soon"
// products, so the brand never reads as a single-SKU company.
const FALLBACK_TEASERS = [
  { title: "Precision Bakeware Set", category: "Bakeware" },
  { title: "Commercial Dough Cutter", category: "Kitchen Equipment" },
  { title: "Modular Prep Accessories", category: "Accessories" },
  { title: "Portioning Tool Series", category: "Commercial Tools" },
];

const ComingSoon = () => {
  const { comingSoon } = useProducts();
  const teasers = comingSoon.length > 0 ? comingSoon : FALLBACK_TEASERS;

  return (
    <section className="section-pad mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-16 max-w-2xl"
      >
        <span className="eyebrow">The Road Ahead</span>
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          More precision tools, coming soon.
        </h2>
        <p className="mt-4 text-slate">
          The Brownie Divider is the first of many. Our next generation of bakeware and kitchen
          equipment is already in development.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {teasers.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-xl2 border border-ink/8 bg-cloud"
          >
            <div className="flex h-56 items-center justify-center bg-gradient-to-br from-ink/5 to-ink/10 blur-[2px] transition-all duration-500 group-hover:blur-[1px]">
              <span className="font-mono text-5xl text-ink/10">?</span>
            </div>
            <div className="absolute left-4 top-4 rounded-full bg-brenn-yellow px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink">
              Coming Soon
            </div>
            <div className="p-5">
              <p className="font-mono text-[11px] uppercase tracking-widest text-slate">{t.category}</p>
              <h3 className="mt-1 font-display font-semibold">{t.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ComingSoon;
