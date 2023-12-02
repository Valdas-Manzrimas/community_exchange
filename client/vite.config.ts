import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '');

  if (command === 'build') {
    return {
      build: {
        sourcemap: 'hidden',
        minify: 'terser',
      },
    };
  }

  return {
    define: {
      'process.env.SOME_KEY': JSON.stringify(env.SOME_KEY),
    },
    plugins: [react()],
  };
});
