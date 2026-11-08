import type { Config } from 'tailwindcss';

const c = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bond: '#EFF1EF',
        ink: '#14201C',
        rule: '#C9D1CD',
        field: '#0B1714',
        green: '#0C6B57',
        signal: '#37D6A4',
        defence: '#37D6A4',
        offence: '#A34A32',
        caution: '#D8A32B',
        canvas: c('canvas'),
        basalt: c('basalt'),
        'terrain-deep': c('terrain-deep'),
        'terrain-mid': c('terrain-mid'),
        clay: c('clay'),
        dusk: c('dusk'),
        mist: c('mist'),
        hairline: c('hairline'),
      },
      spacing: {
        18: '4.5rem',
      },
      fontFamily: {
        display: ['var(--font-archivo)'],
        sans: ['var(--font-source-serif)'],
        mono: ['var(--font-ibm-mono)'],
      },
      transitionTimingFunction: {
        terrain: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        ridge: 'var(--shadow-ridge)',
      },
    },
  },
  plugins: [],
};

export default config;
