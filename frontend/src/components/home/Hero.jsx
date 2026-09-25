import { motion } from "framer-motion";
import { HiArrowDown } from "react-icons/hi";
import Button from "../ui/Button.jsx";
import useWebsiteContent from "../../hooks/useWebsiteContent.js";
import useProducts from "../../hooks/useProducts.js";
import { HeroSkeleton } from "../ui/Skeleton.jsx";
import uncutBrownie from "../../assets/uncut-brownie.png";

const Hero = () => {
  const { content, loading } = useWebsiteContent();
  const { featured } = useProducts();
  const hero = content?.hero;
  
  // Using the uploaded uncut brownie image
  const heroImage = uncutBrownie;

  return (
    <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24 lg:pt-32 min-h-[90vh] flex flex-col justify-center">
      
      {/* Background Yellow Glow */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-32 top-10 h-[500px] w-[500px] rounded-full bg-brenn-yellow/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 w-full">
        {loading ? (
          <HeroSkeleton />
        ) : (
          <div className="flex flex-col items-center gap-16 lg:flex-row lg:gap-24">
            
            {/* Left Content */}
            <div className="w-full lg:flex-1 pt-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 text-sm font-semibold tracking-widest text-brenn-yellow uppercase mb-6"
              >
                <span className="h-[2px] w-8 bg-brenn-yellow" />
                The Perfect Cut
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.5rem]"
              >
                {hero?.heading || "Precision Brownie"}
                <br />
                <span className="text-ink/80">{hero?.subheading || "Divider"}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 max-w-lg text-lg leading-relaxed text-slate"
              >
                {hero?.description ||
                  "Cut perfect, uniform brownies every time with a tool engineered for bakeries and home kitchens that demand consistency."}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 flex flex-col gap-4 sm:flex-row"
              >
                <Button className="w-full text-center sm:w-auto shadow-lg shadow-brenn-yellow/20 hover:-translate-y-0.5 transition-transform" href={hero?.primaryCtaUrl || featured?.amazonUrl || "https://www.amazon.com"}>
                  {hero?.primaryCtaLabel || "Buy on Amazon"}
                </Button>
                <Button className="w-full text-center sm:w-auto border-none hover:bg-slate-50 transition-colors" variant="secondary" href="/about">
                  {hero?.secondaryCtaLabel || "Learn More"}
                </Button>
              </motion.div>
            </div>

            {/* Right Content - Automated Splinter Grid */}
            <div className="relative w-full lg:flex-1 mt-8 lg:mt-0 flex justify-center perspective-1000">
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[480px] aspect-square"
              >
                {/* 16-Piece Image Grid - Animated Automatically */}
                <motion.div 
                  animate={{ gap: ["0px", "0px", "8px", "8px", "0px"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 grid grid-cols-4 grid-rows-4 p-2"
                >
                  {Array.from({ length: 16 }).map((_, i) => {
                    const col = i % 4;
                    const row = Math.floor(i / 4);
                    const x = col * 33.3333; // 0, 33.3, 66.6, 100
                    const y = row * 33.3333; // 0, 33.3, 66.6, 100
                    return (
                      <motion.div
                        key={i}
                        animate={{ borderRadius: ["0px", "0px", "6px", "6px", "0px"] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-full h-full shadow-sm"
                        style={{
                          backgroundImage: `url(${heroImage})`,
                          backgroundPosition: `${x}% ${y}%`,
                          backgroundSize: "400% 400%",
                        }}
                      />
                    );
                  })}
                </motion.div>

                {/* Subtle Instruction/Caption */}
                <motion.div 
                  animate={{ opacity: [0, 0, 1, 1, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-12 left-1/2 -translate-x-1/2"
                >
                  <p className="text-xs font-bold tracking-widest text-brenn-yellow uppercase whitespace-nowrap">
                    16 Perfect Pieces
                  </p>
                </motion.div>
                
              </motion.div>
            </div>
            
          </div>
        )}
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="mt-16 flex justify-center text-slate/40 pb-4"
      >
        <HiArrowDown size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;