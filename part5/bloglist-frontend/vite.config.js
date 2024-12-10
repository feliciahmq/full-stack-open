import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3003', // forwards all req made to localhost:5173/api to backend 
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true, // no need to import describe, test, expect into tests
    setupFiles: './testSetup.js',
  }
})
