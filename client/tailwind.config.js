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
      borderLeft: {
        primary: '2px solid #166534',
      },
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
      error: '#f4443f',
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
      dark: '#09090b',
      tahiti: '#3ab7bf',
      bermuda: '#78dcca',
    },
  },
  plugins: [],
};
