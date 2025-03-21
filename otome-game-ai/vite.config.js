import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    base: '/otomeGame/',
    // 在plugins数组中添加
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()],
      })
    ],
    server: {
      host: '0.0.0.0',
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://backend-api-domain.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          headers: {
            Authorization: `Bearer ${process.env.VITE_DEEPSEEK_API_KEY}`
          }
        },
        '/ws': {
          target: 'ws://websocket-service-domain.com',
          ws: true,
          changeOrigin: true
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
        '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url))
      }
    },
    build: {
      outDir: 'otomeGame',
      assetsDir: 'static',
      assetsInlineLimit: 4096
    },
    assetsInclude: ['**/*.glb', '**/*.hdr']
  }
})
