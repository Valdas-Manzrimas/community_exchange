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

      '2xl': '1736px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      boxShadow: {
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.1)',
        2: '0 0 6px 0 rgba(0, 0, 0, 0.2)',
      },
      fadeIn: 'fadeIn 0.5s ease-in-out',
    },
    colors: {
      transparent: 'transparent',
      light: '#dcfce6',
      white: '#ffffff',
      primary: {
        DEFAULT: '#166534',
        dark: '#052e16',
      },
      success: '#22c554',
      error: '#fc716d',
      narvik: {
        50: '#f0fdf4',
        100: '#dcfce6',
        200: '#bbf7cd',
        300: '#86efa6',
        400: '#4ade78',
        500: '#22c554',
        600: '#16a341',
        700: '#158036',
        800: '#16652e',
        900: '#145327',
        950: '#052e12',
      },
      gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
      },
      dark: '#09090b',
      tahiti: '#3ab7bf',
      bermuda: '#78dcca',
    },
  },
  plugins: [],
};
