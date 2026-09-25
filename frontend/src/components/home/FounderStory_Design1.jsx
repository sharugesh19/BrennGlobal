import { motion } from "framer-motion";
import brennLogo from "../../assets/brenn_logo.png";

const FounderStory = () => {
  return (
    <section className="bg-ink text-white py-24 sm:py-32 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brenn-yellow/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Left Column: Sticky Title & Logo */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-40">
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                src={brennLogo} 
                alt="Brenn Logo" 
                className="w-16 sm:w-24 h-auto mb-8 opacity-90 brightness-0 invert" 
              />
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="text-brenn-yellow font-semibold tracking-widest uppercase text-xs sm:text-sm mb-4 block">
                  The Story Behind Brenn
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display leading-[1.1]">
                  It started <br className="hidden lg:block"/> with a brownie.
                </h2>
              </motion.div>
            </div>
          </div>

          {/* Right Column: The Story */}
          <div className="lg:col-span-7 lg:pl-12">
            <div className="space-y-12 text-lg sm:text-xl text-slate-300 font-body leading-relaxed">
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <p>
                  <strong className="text-white font-medium">Not a business plan. Not a factory.</strong><br/>
                  Just a brownie that refused to be cut evenly.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <p>
                  My wife is a baker. I watched her measure, mark, cut, and adjust—trying to make every piece perfect. Sixteen pieces meant sixteen measurements. It was an unnecessary amount of effort.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="border-l-2 border-brenn-yellow pl-6 my-10 py-2"
              >
                <p className="text-2xl sm:text-3xl font-display font-medium text-white italic leading-tight">
                  “Why should something this simple be this difficult?”
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <p>
                  I started designing a tool to do the measuring for you—eliminating the guesswork. Then came the hard part. Prototypes failed, measurements changed, and ideas were tested again and again. 
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <p>
                  We kept going until the tool felt perfect in a baker's hands. <strong className="text-white font-medium">That is how Brenn was born.</strong> Not because the world needed another tool, but because a small, everyday frustration deserved a better solution.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <p>
                  This is only the beginning. At Brenn, we look at ordinary problems and ask an extraordinary, simple question: <strong className="text-white font-medium">“Can we make this better?”</strong>
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="pt-10 border-t border-white/10"
              >
                <p className="text-sm sm:text-base text-brenn-yellow/90 uppercase tracking-widest font-bold mb-4">
                  Welcome to Brenn
                </p>
                <p className="text-white text-2xl sm:text-3xl font-display font-semibold leading-snug">
                  Made from a problem.<br/>
                  Refined with persistence.<br/>
                  Created to make everyday things easier.
                </p>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FounderStory;
