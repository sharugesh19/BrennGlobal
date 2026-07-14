import { motion } from "framer-motion";
import SEO from "../components/seo/SEO.jsx";
import useWebsiteContent from "../hooks/useWebsiteContent.js";

const About = () => {
  const { content } = useWebsiteContent();
  const story = content?.story;

  return (
    <div className="mx-auto max-w-5xl px-6 py-40 sm:px-10 lg:px-16">
      <SEO title="About Us" path="/about" description="Learn about Brenn Global's mission to bring precision-engineered kitchen tools to professionals and home bakers worldwide." />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <span className="eyebrow">Our Story</span>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          {story?.heading || "Engineered in pursuit of the perfect cut."}
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-slate">
          {story?.body}
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-xl2 border border-ink/8 bg-white p-8"
        >
          <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-brenn-gold">Mission</h3>
          <p className="leading-relaxed text-ink/80">{story?.mission}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl2 border border-ink/8 bg-white p-8"
        >
          <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-brenn-gold">Vision</h3>
          <p className="leading-relaxed text-ink/80">{story?.vision}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="cut-grid-bg mt-16 rounded-xl2 bg-ink p-10 text-white sm:p-14"
      >
        <h3 className="text-2xl font-bold">Manufacturing Excellence</h3>
        <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
          Every Brenn Global product moves through a multi-stage quality process — material
          sourcing, precision machining, and hands-on inspection — before it's approved to ship.
          It's a slower way to build a product line, but it's the only way we build ours.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
