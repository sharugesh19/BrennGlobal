import { motion } from "framer-motion";
import SEO from "../components/seo/SEO.jsx";
import useWebsiteContent from "../hooks/useWebsiteContent.js";
import brennLogo from "../assets/brenn_logo.png";

const About = () => {
  const { content } = useWebsiteContent();
  const story = content?.story;

  return (
    <div className="pt-24 pb-24 sm:pt-32 sm:pb-32 overflow-hidden bg-white">
      <SEO title="About Us | Brenn" path="/about" description="Learn about Brenn's mission to bring precision-engineered kitchen tools to professionals and home bakers worldwide." />

      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl font-display text-ink leading-[1.05]">
              We believe in <br className="hidden sm:block"/> absolute precision.
            </h1>
            <p className="mt-8 text-xl sm:text-2xl leading-relaxed text-slate">
              Brenn is an engineering-first kitchen brand dedicated to solving everyday frustrations through meticulous design.
            </p>
          </motion.div>
        </div>

        {/* Brand Origin Story (Third-Person, Professional Wording) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/3] lg:aspect-square bg-ink rounded-3xl overflow-hidden relative shadow-xl ring-1 ring-black/5 flex items-center justify-center"
          >
            {/* Subtle radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,204,0,0.12),transparent_70%)]"></div>
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            <img src={brennLogo} alt="Brenn Logo" className="relative z-10 w-32 sm:w-48 h-auto object-contain drop-shadow-[0_0_40px_rgba(255,204,0,0.3)]" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brenn-yellow font-bold tracking-widest uppercase text-sm mb-4 block">The Origin</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-ink mb-6 leading-tight">
              Born from a simple <br/> kitchen frustration.
            </h2>
            <div className="space-y-6 text-lg text-slate leading-relaxed">
              <p>
                The concept for Brenn didn't start in a boardroom; it began with a batch of brownies. Watching a baker painstakingly measure, mark, and adjust to get sixteen even pieces revealed a glaring inefficiency.
              </p>
              <p>
                Sixteen pieces meant sixteen separate measurements. It was an unnecessary amount of effort for a task that should be effortless. The question arose naturally: <em className="text-ink font-medium">Why should something this simple be this difficult?</em>
              </p>
              <p>
                That single question sparked a rigorous development process. Through endless prototypes, design iterations, and kitchen tests, we engineered a tool that eliminates the guesswork entirely. Today, Brenn stands as a testament to the idea that no problem is too small to deserve a perfectly engineered solution.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bento Grid for Mission, Vision, Excellence */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1 rounded-[2rem] bg-slate-50 p-10 border border-slate-100 flex flex-col justify-center"
          >
            <h3 className="mb-4 font-body text-xs uppercase tracking-widest text-brenn-yellow font-bold">Our Mission</h3>
            <p className="text-lg leading-relaxed text-ink/80">
              {story?.mission || "To eliminate the guesswork from baking by engineering tools that deliver professional-grade precision to every kitchen."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 rounded-[2rem] bg-ink p-10 sm:p-12 text-white relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 p-8 opacity-[0.03]">
               {/* Decorative Element */}
               <svg width="300" height="300" viewBox="0 0 100 100" fill="none">
                 <path d="M0,0 L100,100 M100,0 L0,100 M50,0 L50,100 M0,50 L100,50" stroke="currentColor" strokeWidth="1"/>
               </svg>
            </div>
            <h3 className="mb-4 font-body text-xs uppercase tracking-widest text-brenn-yellow font-bold relative z-10">Manufacturing Excellence</h3>
            <p className="text-xl sm:text-2xl font-display font-medium leading-relaxed text-slate-200 relative z-10 max-w-2xl">
              Every Brenn product moves through a rigorous quality process—from material sourcing and precision machining to hands-on final inspection. It's a slower way to build, but it's the only way we operate.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3 rounded-[2rem] bg-brenn-yellow/10 p-10 sm:p-16 border border-brenn-yellow/20 text-center"
          >
            <h3 className="mb-4 font-body text-xs uppercase tracking-widest text-brenn-yellow font-bold">Our Vision</h3>
            <p className="text-2xl sm:text-4xl font-display font-medium text-ink max-w-3xl mx-auto leading-tight">
              {story?.vision || "A world where everyday frustrations are met with beautifully simple, brilliantly engineered solutions."}
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default About;
