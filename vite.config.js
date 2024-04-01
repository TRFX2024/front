import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true, // Habilita la división de código CSS
    // Otras opciones de configuración de construcción
  }
})
