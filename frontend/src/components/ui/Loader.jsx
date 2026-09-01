import brennLogo from "../../assets/brenn_logo.png";

const SIZES = {
  sm: { box: "h-10 w-10", ring: "border-2", logoPad: "p-1.5" },
  md: { box: "h-16 w-16", ring: "border-[3px]", logoPad: "p-2.5" },
  lg: { box: "h-24 w-24", ring: "border-4", logoPad: "p-4" },
};

/**
 * Brand loading indicator: the Brenn logo sitting still, with a ring
 * spinning around it. Use this anywhere content is loading instead of a
 * generic spinner, so the loading state itself reinforces the brand.
 *
 * - size: "sm" | "md" | "lg" (default "md")
 * - fullScreen: centers itself in a full-viewport-height wrapper, for
 *   page-level loading (e.g. route transitions)
 * - label: optional text shown under the loader
 */
const Loader = ({ size = "md", fullScreen = false, label }) => {
  const s = SIZES[size] || SIZES.md;

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`relative ${s.box}`}>
        <span
          aria-hidden
          className={`absolute inset-0 animate-spin rounded-full ${s.ring} border-brenn-yellow/20 border-t-brenn-yellow`}
        />
        <div className={`absolute inset-0 flex items-center justify-center ${s.logoPad}`}>
          <img src={brennLogo} alt="" className="h-full w-full object-contain" />
        </div>
      </div>
      {label && <span className="font-mono text-xs uppercase tracking-widest text-slate">{label}</span>}
    </div>
  );

  if (fullScreen) {
    return (
      <div role="status" aria-label={label || "Loading"} className="flex min-h-screen items-center justify-center">
        {spinner}
      </div>
    );
  }

  return (
    <div role="status" aria-label={label || "Loading"}>
      {spinner}
    </div>
  );
};

export default Loader;