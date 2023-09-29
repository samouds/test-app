import { resolve, dirname } from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const __dirname = dirname(new URL(import.meta.url).pathname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
})
