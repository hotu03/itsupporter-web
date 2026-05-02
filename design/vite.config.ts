import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env based on mode
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    base: mode === 'customer' ? '/' : '/',

    build: mode === 'customer'
      ? {
          outDir: 'dist-customer',
          rollupOptions: {
            input: path.resolve(__dirname, 'customer-index.html'),
            output: {
              manualChunks: {
                recharts: ['recharts'],
                radix: [
                  '@radix-ui/react-dialog',
                  '@radix-ui/react-dropdown-menu',
                  '@radix-ui/react-select',
                  '@radix-ui/react-tabs',
                  '@radix-ui/react-tooltip',
                ],
              },
            },
          },
        }
      : {
          rollupOptions: {
            output: {
              manualChunks: {
                recharts: ['recharts'],
                radix: [
                  '@radix-ui/react-dialog',
                  '@radix-ui/react-dropdown-menu',
                  '@radix-ui/react-select',
                  '@radix-ui/react-tabs',
                  '@radix-ui/react-tooltip',
                ],
                dashboard: [
                  './src/app/pages/Dashboard',
                  './src/app/pages/Finance',
                  './src/app/pages/Machines',
                ],
              },
            },
          },
        },

    assetsInclude: ['**/*.svg', '**/*.csv'],
  }
})