import { Link } from "react-router-dom";
import SEO from "../components/seo/SEO.jsx";

const NotFound = () => (
  <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
    <SEO title="Page Not Found" path="/404" />
    <span className="font-mono text-sm uppercase tracking-widest text-brenn-gold">404</span>
    <h1 className="mt-3 text-4xl font-extrabold tracking-tight">This page doesn't exist.</h1>
    <p className="mt-4 text-slate">The page you're looking for may have been moved or removed.</p>
    <Link to="/" className="btn-dark mt-8 inline-flex">Back to Home</Link>
  </div>
);

export default NotFound;
