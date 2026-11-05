import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    // Fluid up to 1760px so wide monitors are filled, with side padding that grows with the screen.
    container: { center: true, padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2.5rem", xl: "3.5rem", "2xl": "4rem" }, screens: { "2xl": "1760px" } },
    extend: {
      colors: {
        bg: "#090B12",
        surface: "#111522",
        elevated: "#1B2233",
        line: "rgba(148,163,184,0.12)",
        violet: { DEFAULT: "#8B5CF6", soft: "#A78BFA", deep: "#6D28D9" },
        cyan: { DEFAULT: "#22D3EE", soft: "#67E8F9", deep: "#0891B2" },
        ink: { DEFAULT: "#E8EAF2", muted: "#939BAD", faint: "#5D6577" },
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#F43F5E",
      },
      fontFamily: {
        display: ["'Space Grotesk Variable'", "system-ui", "sans-serif"],
        sans: ["'Inter Variable'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono Variable'", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(139,92,246,0.35), 0 0 40px -8px rgba(139,92,246,0.55)",
        "glow-cyan": "0 0 0 1px rgba(34,211,238,0.35), 0 0 40px -8px rgba(34,211,238,0.5)",
        panel: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 50px -20px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)",
        "brand-gradient-soft": "linear-gradient(135deg, rgba(139,92,246,0.18) 0%, rgba(34,211,238,0.12) 100%)",
      },
      keyframes: {
        "gradient-x": { "0%,100%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "marquee-reverse": { from: { transform: "translateX(-50%)" }, to: { transform: "translateX(0)" } },
        shimmer: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
        "pulse-ring": { "0%": { transform: "scale(0.8)", opacity: "0.8" }, "100%": { transform: "scale(2.2)", opacity: "0" } },
        "grid-pan": { from: { backgroundPosition: "0 0" }, to: { backgroundPosition: "64px 64px" } },
        blink: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
      },
      animation: {
        "gradient-x": "gradient-x 6s ease infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        shimmer: "shimmer 3s linear infinite",
        "pulse-ring": "pulse-ring 2.2s cubic-bezier(0.2,0.6,0.4,1) infinite",
        "grid-pan": "grid-pan 12s linear infinite",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
