import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/thiagocanali.github.io/',
  server: {
    proxy: {
      '/tasks': 'http://localhost:3000'
    }
  }
})
