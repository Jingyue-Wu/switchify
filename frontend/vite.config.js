import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    watch: {
      // Exclude the server directory from being processed by Vite
      exclude: 'server/**',
    },
  },
});
