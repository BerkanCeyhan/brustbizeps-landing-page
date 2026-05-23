/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        // Theme variables mapped dynamically from state
        tBg: "var(--color-bg)",
        tPrimary: "var(--color-primary)",
        tAccent: "var(--color-accent)",
        tText: "var(--color-text)",
        tCard: "var(--color-card)",
      },
      boxShadow: {
        'hard': '4px 4px 0px var(--color-text)',
        'soft-premium': '0 8px 32px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        }
      }
    },
  },
  plugins: [],
}
