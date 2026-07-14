import { motion } from "framer-motion";
import { HiOutlineSparkles, HiOutlineCog, HiOutlineLightBulb } from "react-icons/hi";
import Card from "../ui/Card.jsx";

const PILLARS = [
  {
    icon: <HiOutlineSparkles />,
    title: "Premium Materials",
    desc: "Only food-grade, corrosion-resistant materials make it into a Brenn product — nothing is built to be replaced.",
  },
  {
    icon: <HiOutlineCog />,
    title: "Manufacturing Precision",
    desc: "Every unit is machined to tight tolerances so the tool performs identically out of the box and after years of use.",
  },
  {
    icon: <HiOutlineLightBulb />,
    title: "Purposeful Innovation",
    desc: "We design around a real kitchen problem first, then engineer the simplest tool that solves it completely.",
  },
];

const WhyBrenn = () => {
  return (
    <section className="section-pad mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 max-w-2xl"
      >
        <span className="eyebrow">Why Brenn</span>
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Built like professional equipment.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {PILLARS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-brenn-yellow/15 text-2xl text-brenn-yellow-dark">
                {p.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{p.title}</h3>
              <p className="text-sm leading-relaxed text-slate">{p.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyBrenn;
