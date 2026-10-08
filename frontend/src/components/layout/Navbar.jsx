import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HiMenu, HiX, HiShoppingBag } from "react-icons/hi";
import brennLogo from "../../assets/brenn_logo.png";
import { useCartStore } from "../../store/useCartStore.js";
import CartDrawer from "./CartDrawer.jsx";

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
  const openCart = useCartStore((s) => s.openCart);
  const count = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

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

  const CartButton = (
    <button aria-label="Open cart" onClick={openCart} className="relative text-2xl">
      <HiShoppingBag />
      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brenn-yellow px-1 text-[11px] font-bold text-ink">
          {count}
        </span>
      )}
    </button>
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium ${scrolled ? "bg-white/80 shadow-sm backdrop-blur-xl" : "bg-transparent"
          }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={brennLogo} alt="Brenn" className="h-9 w-auto object-contain" />
          </Link>

          <ul className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `font-body text-sm font-medium tracking-wide transition-colors ${isActive ? "text-ink" : "text-slate hover:text-ink"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-6 md:flex">
            {CartButton}
            <Link to="/products" className="btn-dark inline-flex !py-2.5 !px-6 text-sm">
              Buy Now
            </Link>
          </div>

          <div className="flex items-center gap-5 md:hidden">
            {CartButton}
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              className="text-2xl"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <HiX /> : <HiMenu />}
            </button>
          </div>
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

      {/* Outside the header on purpose: the header's backdrop-blur would break fixed positioning */}
      <CartDrawer />
    </>
  );
};

export default Navbar;