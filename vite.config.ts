import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: '0.0.0.0', // Make sure it's binding to all interfaces
    strictPort: true,
    port: 4173, // Ensure this matches the Docker port mapping
  },
});
