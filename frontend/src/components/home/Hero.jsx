import { motion } from "framer-motion";
import { HiArrowDown } from "react-icons/hi";
import Button from "../ui/Button.jsx";
import useWebsiteContent from "../../hooks/useWebsiteContent.js";
import useProducts from "../../hooks/useProducts.js";
import { HeroSkeleton } from "../ui/Skeleton.jsx";
import uncutBrownie from "../../assets/uncut-brownie.webp";

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
                initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative mt-10 inline-block"
              >
                <motion.div
                  aria-hidden
                  animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.06, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-3 rounded-3xl bg-brenn-yellow/30 blur-xl"
                />
                <div className="relative rounded-2xl border-2 border-brenn-yellow bg-white px-6 py-5 shadow-xl shadow-brenn-yellow/20 sm:px-8">
                  <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-brenn-yellow">
                    Introductory offer
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <span className="relative text-3xl font-bold text-slate sm:text-4xl">
                      ₹1,499
                      <motion.span
                        aria-hidden
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
                        style={{ transformOrigin: "left center", rotate: -6, y: "-50%" }}
                        className="absolute left-0 right-0 top-1/2 h-[3px] bg-red-500"
                      />
                    </span>
                    <span className="text-6xl font-black tracking-tight text-ink sm:text-7xl">₹999</span>
                  </div>
                  <motion.span
                    animate={{ rotate: [-4, 4, -4] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-3 -top-4 inline-block rounded-full bg-brenn-yellow px-4 py-1 text-sm font-extrabold uppercase text-black shadow-lg"
                  >
                    Save ₹500
                  </motion.span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 flex flex-col gap-4 sm:flex-row"
              >
                <Button className="w-full text-center sm:w-auto shadow-lg shadow-brenn-yellow/20 hover:-translate-y-0.5 transition-transform" href="/products">
                  Buy Now
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
                    const x = col * 33.3333;
                    const y = row * 33.3333;
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

        {/* Bulk orders: full width */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-16 flex w-full flex-col items-center gap-2 border-t border-slate/20 pt-10 text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-brenn-yellow">
              Bulk orders and direct buying
            </p>
            <a
              href="https://wa.me/918489999988"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap text-4xl font-black tracking-tight text-ink hover:text-brenn-yellow sm:text-6xl"
            >
              +91 84899 99988
            </a>
            <p className="text-base text-slate">
              Message us on WhatsApp or email support@brennglobal.in
            </p>
          </motion.div>
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