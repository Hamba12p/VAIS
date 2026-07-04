import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        charcoal: 'rgb(var(--color-charcoal) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        border: 'rgba(0,0,0,0.06)',
        white: '#ffffff',
        /* VAIS-prefixed aliases (used across the codebase) */
        'vais-surface': 'rgb(var(--color-surface) / <alpha-value>)',
        'vais-charcoal': 'rgb(var(--color-charcoal) / <alpha-value>)',
        'vais-muted': 'rgb(var(--color-muted) / <alpha-value>)',
        'vais-border': 'rgba(0,0,0,0.06)',
        'vais-green': 'rgb(var(--color-primary) / <alpha-value>)',
        'vais-green-light': 'rgba(var(--color-primary),0.08)',
        'vais-mint': 'rgb(var(--color-accent) / <alpha-value>)',
        'vais-slate': 'rgb(var(--color-muted) / <alpha-value>)',
      },
      fontFamily: {
        sora: ['var(--font-sora)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
      },
      borderRadius: {
        'vais': '4px',
        'vais-md': '8px',
      },
      boxShadow: {
        'vais-card': '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'vais-elevated': '0 4px 16px 0 rgba(0,0,0,0.08)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
