import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        contact: resolve(__dirname, 'contact.html'),
        work: resolve(__dirname, 'work.html'),
        portfolio: resolve(__dirname, 'portfolio-websites.html'),
        business: resolve(__dirname, 'business-websites.html'),
        redesign: resolve(__dirname, 'website-redesign-speed.html'),
      },
    },
  },
})
