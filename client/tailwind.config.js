// tailwind.config.js

import colors from './src/styles/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xsm: '300px',
      // => @media (min-width: 300px) { ... }

      sm: '370px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      xmd: '900px',
      // => @media (min-width: 900px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1736px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      boxShadow: {
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.1)',
        2: '0 0 6px 0 rgba(0, 0, 0, 0.2)',
      },
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
    colors: colors,
  },
  plugins: [],
};
