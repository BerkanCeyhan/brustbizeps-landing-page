import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves at /<repo>/ → base muss matchen, sonst 404 auf Assets.
export default defineConfig({
  base: '/brustbizeps-landing-page/',
  plugins: [react()],
})
