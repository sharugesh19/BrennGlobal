/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0B", // brand black
        paper: "#FFFFFF",
        cloud: "#F4F4F2", // light gray background
        graphite: "#232326", // dark gray
        slate: "#6B6B70",
        brenn: {
          yellow: "#FFC107",
          "yellow-dark": "#E6A800",
          gold: "#C9A227",
        },
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "grid-lines":
          "linear-gradient(to right, rgba(10,10,11,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,10,11,0.05) 1px, transparent 1px)",
      },
      boxShadow: {
        premium: "0 20px 60px -15px rgba(10,10,11,0.25)",
        "glow-yellow": "0 0 40px rgba(255,193,7,0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
