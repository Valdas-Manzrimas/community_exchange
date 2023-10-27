// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xsm: '300px',
      // => @media (min-width: 300px) { ... }

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      boxShadow: {
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.1)',
      },
    },
    colors: {
      transparent: 'transparent',
      light: '#f0fdf4',
      primary: {
        DEFAULT: '#166534',
        dark: '#052e16',
      },
      dark: '#09090b',
      tahiti: '#3ab7bf',
      bermuda: '#78dcca',
    },
  },
  plugins: [],
};
