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

// const keyPath = path.join(__dirname, process.env.SSL_KEY_PATH);
// const certPath = path.join(__dirname, process.env.SSL_CERT_PATH);

// console.log('SSL Key Path:', keyPath);
// console.log('SSL Cert Path:', certPath);

// if (!fs.existsSync(keyPath)) {
//   console.error('SSL Key file does not exist at:', keyPath);
// }

// if (!fs.existsSync(certPath)) {
//   console.error('SSL Cert file does not exist at:', certPath);
// }

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
