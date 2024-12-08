import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['core-js/modules/es.promise.js', 'core-js/modules/es.string.match.js', /* add other unresolved modules here */],
    },}
})
