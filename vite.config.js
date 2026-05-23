import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom Domain: try.brustbizeps.de
// Die App lebt unter /aktion/1/ → CNAME + post-build restructure in der GH Actions workflow.
export default defineConfig({
  base: '/aktion/1/',
  plugins: [react()],
})
