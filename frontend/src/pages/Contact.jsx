import { motion } from "framer-motion";
import { HiOutlinePhone, HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import SEO from "../components/seo/SEO.jsx";
import ContactForm from "../components/contact/ContactForm.jsx";
import useWebsiteContent from "../hooks/useWebsiteContent.js";

const Contact = () => {
  const { content } = useWebsiteContent();
  const footer = content?.footer;

  return (
    <div className="mx-auto max-w-6xl px-6 py-40 sm:px-10 lg:px-16">
      <SEO title="Contact Us" path="/contact" description="Get in touch with the Brenn team." />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-14 max-w-xl"
      >
        <span className="eyebrow">Get In Touch</span>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          We&apos;d love to hear from you.
        </h1>
        <p className="mt-4 text-slate">
          Questions about the Brownie Divider, wholesale inquiries, or press &mdash; reach out and our
          team will respond within one business day.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-ink/8 bg-white p-6">
            <div className="flex items-start gap-3">
              <HiOutlinePhone className="mt-1 text-xl text-brenn-yellow-dark" />
              <div>
                <p className="text-xs uppercase tracking-widest text-slate">Phone</p>
                <p className="mt-1 font-medium">{footer?.phone || "+91 84899 99988"}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-ink/8 bg-white p-6">
            <div className="flex items-start gap-3">
              <HiOutlineMail className="mt-1 text-xl text-brenn-yellow-dark" />
              <div>
                <p className="text-xs uppercase tracking-widest text-slate">Email</p>
                <p className="mt-1 font-medium">{footer?.email || "support@brennglobal.in"}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-ink/8 bg-white p-6">
            <div className="flex items-start gap-3">
              <HiOutlineLocationMarker className="mt-1 text-xl text-brenn-yellow-dark" />
              <div>
                <p className="text-xs uppercase tracking-widest text-slate">Address</p>
                <p className="mt-1 font-medium">{footer?.address || "Udumalaipettai, Tamil Nadu, India"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
