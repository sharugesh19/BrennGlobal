import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import brennLogo from "../../assets/brenn_logo.png";

const STORY_STEPS = [
  {
    title: "The Catalyst",
    content: "Not a business plan. Not a factory. Just a brownie that refused to be cut evenly.",
  },
  {
    title: "The Frustration",
    content: "My wife is a baker. I watched her measure, mark, cut, and adjust—trying to make every piece perfect. Sixteen pieces meant sixteen measurements. It was an unnecessary amount of effort.",
  },
  {
    title: "The Question",
    content: "“Why should something this simple be this difficult?”",
    isQuote: true,
  },
  {
    title: "The Process",
    content: "I started designing a tool to do the measuring for you. Prototypes failed, measurements changed, and ideas were tested again and again until it felt perfect in a baker's hands.",
  },
  {
    title: "The Birth of Brenn",
    content: "Not because the world needed another tool, but because a small, everyday frustration deserved a better solution.",
  }
];

const FounderStory = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Calculate the height of the line based on scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="bg-ink text-white py-24 sm:py-32 relative overflow-hidden">
      {/* Centered Heading */}
      <div className="mx-auto max-w-4xl px-6 text-center mb-24 relative z-10">
        <motion.img 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          src={brennLogo} 
          alt="Brenn Logo" 
          className="h-16 sm:h-20 w-auto mx-auto mb-8 object-contain" 
        />
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-brenn-yellow font-semibold tracking-widest uppercase text-sm mb-4 block"
        >
          The Story Behind Brenn
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display"
        >
          It started with a brownie.
        </motion.h2>
      </div>

      <div className="mx-auto max-w-5xl px-2 sm:px-10 lg:px-16 relative z-10">
        {/* Vertical Line track */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 rounded-full"></div>
        {/* Animated Fill Line */}
        <motion.div 
          style={{ height: lineHeight }}
          className="absolute left-1/2 top-0 w-[2px] bg-brenn-yellow -translate-x-1/2 shadow-[0_0_15px_rgba(255,204,0,0.5)] origin-top"
        ></motion.div>

        <div className="space-y-16 sm:space-y-24 relative">
          {STORY_STEPS.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={step.title} className={`flex flex-row items-center w-full ${isEven ? 'justify-start' : 'justify-end'} relative`}>
                
                {/* Node Dot */}
                <div className="absolute left-1/2 top-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-ink border-2 border-brenn-yellow -translate-x-1/2 -translate-y-1/2 z-20 shadow-[0_0_10px_rgba(255,204,0,0.8)]"></div>

                {/* Content Card */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
                  className={`w-[48%] sm:w-[45%] ${isEven ? 'pr-3 sm:pr-12 lg:pr-16' : 'pl-3 sm:pl-12 lg:pl-16'}`}
                >
                  <div className={`p-4 sm:p-8 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300 relative ${step.isQuote ? 'border-brenn-yellow/30 bg-brenn-yellow/5' : ''}`}>
                    <span className="text-brenn-yellow/80 text-[10px] sm:text-xs uppercase tracking-widest font-bold mb-2 sm:mb-3 block line-clamp-1">
                      {String(index + 1).padStart(2, '0')} // {step.title}
                    </span>
                    <p className={`text-slate-300 font-body leading-snug sm:leading-relaxed ${step.isQuote ? 'text-sm sm:text-3xl font-display font-medium text-white italic leading-tight' : 'text-xs sm:text-lg'}`}>
                      {step.content}
                    </p>
                  </div>
                </motion.div>
                
              </div>
            );
          })}
        </div>

        {/* Closing statement */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-24 sm:mt-32 text-center max-w-2xl mx-auto p-10 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md"
        >
          <p className="text-white text-xl sm:text-2xl font-display font-semibold mb-6">
            “Can we make this better?”
          </p>
          <p className="text-slate-300 mb-8 font-body">
            If the answer is yes, we'll try. Welcome to Brenn.
          </p>
          <p className="text-brenn-yellow uppercase tracking-widest text-sm font-bold">
            Made from a problem.<br className="sm:hidden"/> Refined with persistence.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderStory;
