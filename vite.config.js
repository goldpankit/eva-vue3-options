import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default ({mode}) => {
  const apiPrefix = loadEnv(mode, process.cwd()).VITE_APP_API_PREFIX
  const apiUrl = loadEnv(mode, process.cwd()).VITE_APP_API_URL
  return defineConfig({
    plugins: [
      vue(),
      eslint({
        include: ['src/**/*.js', 'src/**/*.vue'],
        exclude: ['node_modules']
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: ['.vue', '.js']
    },
    server: {
      host: '0.0.0.0',
      port: 10086,
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${apiPrefix}`), "")
        }
      }
    }
  })
}
