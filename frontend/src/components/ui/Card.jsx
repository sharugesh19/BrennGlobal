import { motion } from "framer-motion";

const Card = ({ children, className = "", hover = true, ...rest }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-xl2 border border-ink/8 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-premium ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default Card;
