// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
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
