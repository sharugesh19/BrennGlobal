import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import brennLogo from "../../assets/brenn_logo.png";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Always close the mobile menu when navigating to a new page, regardless
  // of how the navigation happened (link tap, back/forward, programmatic).
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium ${
        scrolled ? "bg-white/80 shadow-sm backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={brennLogo} alt="Brenn" className="h-9 w-auto object-contain" />
          <span className="font-display text-xl font-extrabold tracking-tight">
            BRENN
          </span>
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `font-body text-sm font-medium tracking-wide transition-colors ${
                    isActive ? "text-ink" : "text-slate hover:text-ink"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link to="/products" className="btn-dark hidden md:inline-flex !py-2.5 !px-6 text-sm">
          Buy Now
        </Link>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-2xl md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink/8 bg-white md:hidden">
          <ul className="flex flex-col gap-1 px-6 pb-6 pt-2">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-body text-base font-medium text-ink"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link to="/products" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">
                Buy Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;