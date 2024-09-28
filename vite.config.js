import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});

export default defineConfig({
  plugins: [
    react(),
    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: 'server/',
    //       dest: './'
    //     }
    //   ],
    //   hook: 'buildEnd',
    // }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  server: {
    historyApiFallback: true,
    https: {
      key: fs.readFileSync(process.env.SSL_KEY_PATH),
      cert: fs.readFileSync(process.env.SSL_CERT_PATH)
    },
    proxy: {
      '/api/': {
        target: 'https://192.168.1.20:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      },
      '/uploads/': {
        target: 'https://192.168.1.20:8080',
        changeOrigin: true,
        secure: false,
      }
    },
    host: '192.168.1.20',
    port: 3000,
  },
})
