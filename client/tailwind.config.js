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
      success: '#22c554',
      error: '#fc716d',
      primary: {
        50: '#e7eef5',
        100: '#c3d4e1',
        200: '#9dbacc',
        300: '#759fb7',
        400: '#4e85a2',
        DEFAULT: '#305C84',
        600: '#274d6b',
        700: '#1e3e52',
        800: '#152f39',
        900: '#0c2020',
      },
      secondary: {
        50: '#eefaf7',
        100: '#d4f2e6',
        200: '#b8e9d5',
        300: '#9ce0c4',
        400: '#80d7b3',
        DEFAULT: '#77C79E',
        600: '#5daa81',
        700: '#438d64',
        800: '#297047',
        900: '#0f532a',
      },
      brown: {
        50: '#FDF7F4',
        100: '#FBEFE9',
        200: '#F6E2D7',
        300: '#F1D5C5',
        400: '#ECC8B3',
        DEFAULT: '#B5987D',
        600: '#8A735F',
        700: '#5F4E41',
        800: '#342923',
        900: '#0A0405',
      },
      gray: {
        50: '#FDFDFD',
        100: '#FAFAFA',
        200: '#F5F5F5',
        300: '#F0F0F0',
        400: '#E5E5E5',
        DEFAULT: '#E9E9E9',
        600: '#BFBFBF',
        700: '#8C8C8C',
        800: '#595959',
        900: '#262626',
      },
      red: {
        50: '#FEF2F2',
        100: '#FEE2E2',
        200: '#FECACA',
        300: '#FCA5A5',
        400: '#F87171',
        500: '#EF4444',
        600: '#DC2626',
        700: '#B91C1C',
        800: '#991B1B',
        900: '#7F1D1D',
      },
      dark: '#09090b',
    },
  },
  plugins: [],
};
