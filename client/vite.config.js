import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({fastrefresh:false})],
  worker: {
    plugins :[react()],
  }
})
