import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import useWebsiteContent from "../../hooks/useWebsiteContent.js";

const WhatsAppButton = () => {
  const { content } = useWebsiteContent();
  const number = content?.footer?.whatsappNumber || "15551234567";

  return (
    <motion.a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-20 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-premium ring-4 ring-white sm:bottom-6 sm:right-6"
    >
      <FaWhatsapp />
    </motion.a>
  );
};

export default WhatsAppButton;