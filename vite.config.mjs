import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/') || id.includes('/node_modules/scheduler/')) return 'react';
          if (id.includes('/node_modules/highlight.js/')) return 'syntax';
          if (id.includes('/src/content/lectures-basic')) return 'lectures-basic';
          if (id.includes('/src/content/lectures-advanced')) return 'lectures-advanced';
          if (id.includes('/src/content/lecture-polymorphism')) return 'lecture-polymorphism';
          if (id.includes('/src/content/interviews')) return 'interviews';
          if (id.includes('/src/content/historical-examples')) return 'historical-examples';
          if (id.includes('/src/content/')) return 'curriculum';
        }
      }
    }
  }
});
