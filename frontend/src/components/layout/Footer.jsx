import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import useWebsiteContent from "../../hooks/useWebsiteContent.js";
import brennLogo from "../../assets/brenn_logo.png";

const Footer = () => {
  const { content } = useWebsiteContent();
  const footer = content?.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="cut-grid-bg-light bg-ink text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 sm:px-10 md:grid-cols-4 lg:px-16">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <img src={brennLogo} alt="Brenn Global" className="h-9 w-auto rounded-md object-contain" />
            <span className="font-display text-xl font-extrabold tracking-tight">
              BRENN <span className="text-brenn-yellow">GLOBAL</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            {footer?.description ||
              "Premium precision kitchen tools, engineered for professionals."}
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { icon: <FaInstagram />, href: footer?.social?.instagram },
              { icon: <FaFacebookF />, href: footer?.social?.facebook },
              { icon: <FaYoutube />, href: footer?.social?.youtube },
              { icon: <FaLinkedinIn />, href: footer?.social?.linkedin },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-sm transition-colors hover:border-brenn-yellow hover:text-brenn-yellow"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-5 font-display text-sm font-semibold uppercase tracking-widest text-white/50">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li><Link to="/" className="hover:text-brenn-yellow">Home</Link></li>
            <li><Link to="/products" className="hover:text-brenn-yellow">Products</Link></li>
            <li><Link to="/about" className="hover:text-brenn-yellow">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-brenn-yellow">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-5 font-display text-sm font-semibold uppercase tracking-widest text-white/50">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li>{footer?.phone || "+1 (555) 123-4567"}</li>
            <li>{footer?.email || "hello@brennglobal.com"}</li>
            <li>{footer?.address || "Industrial Ave, Suite 400, Los Angeles, CA"}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/40 sm:px-10 lg:px-16">
        © {year} Brenn Global. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;