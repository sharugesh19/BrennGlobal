import { motion } from "framer-motion";
import { HiOutlineShieldCheck, HiOutlineBadgeCheck, HiOutlineCube, HiOutlineTruck } from "react-icons/hi";

const POINTS = [
  { icon: <HiOutlineBadgeCheck />, title: "Food Grade", desc: "Certified food-safe materials in every product we ship." },
  { icon: <HiOutlineShieldCheck />, title: "Reliable", desc: "Built to perform consistently, batch after batch." },
  { icon: <HiOutlineCube />, title: "Durable", desc: "Engineered to withstand daily commercial-kitchen use." },
  { icon: <HiOutlineTruck />, title: "Precision Manufactured", desc: "Every batch is quality-checked before it leaves the factory." },
];

const WhyChooseUs = () => {
  return (
    <section className="cut-grid-bg bg-graphite py-24 text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-brenn-yellow">Why Choose Us</span>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Quality you can measure.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-8 lg:grid-cols-4">
          {POINTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-xl2 border border-white/10 p-4 sm:p-7"
            >
              <div className="mb-3 text-xl text-brenn-yellow sm:mb-5 sm:text-3xl">{p.icon}</div>
              <h3 className="mb-1.5 font-display text-sm font-semibold sm:mb-2 sm:text-lg">{p.title}</h3>
              <p className="text-xs leading-relaxed text-white/60 sm:text-sm">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;