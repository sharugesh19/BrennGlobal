import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { submitContactMessage } from "../../lib/api/contact.js";
import Button from "../ui/Button.jsx";

const initialState = { name: "", email: "", phone: "", subject: "", message: "" };

const ContactForm = () => {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    setSubmitting(true);
    try {
      await submitContactMessage(form);
      toast.success("Message sent — we'll get back to you shortly.");
      setForm(initialState);
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-ink/12 bg-white px-4 py-3.5 text-sm outline-none transition-colors focus:border-brenn-yellow";

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="rounded-xl2 border border-ink/8 bg-white p-8 shadow-sm sm:p-10"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" className={inputClass} required />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email address" className={inputClass} required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone (optional)" className={inputClass} />
        <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className={inputClass} />
      </div>
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Your message"
        rows={5}
        className={`${inputClass} mt-5 resize-none`}
        required
      />
      <Button type="submit" className="mt-6 w-full sm:w-auto" onClick={undefined}>
        {submitting ? "Sending…" : "Send Message"}
      </Button>
    </motion.form>
  );
};

export default ContactForm;
