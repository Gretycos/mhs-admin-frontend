import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  // base: "/test",
  server: {
    port: 7001,
    proxy: {
      '/admin': {
        target: 'http://127.0.0.1:10010', // 凡是遇到 /api 路径的请求，都映射到 target 属性
        changeOrigin: true
      },
      '/image': {
        target: 'http://127.0.0.1:10010', // 凡是遇到 /upload 路径的请求，都映射到 target 属性
        changeOrigin: true,
        rewrite: path => path.replace(/^\/image/, '/upload')
      }
    }
  }
})
