import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base relativa: el mismo build funciona en la raíz de Hostinger y en la subcarpeta de GitHub Pages.
export default defineConfig({
  base: './',
  plugins: [
    // Las imágenes viven en public/assets y se referencian con rutas relativas tal cual.
    vue({ template: { transformAssetUrls: false } })
  ]
})
