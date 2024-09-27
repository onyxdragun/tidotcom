import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/

const keyPath = path.resolve(__dirname, 'certs', 'localhost+1-key.pem');
const certPath = path.resolve(__dirname, 'certs', 'localhost+1.pem');

console.log('SSL Key Path:', keyPath);
console.log('SSL Cert Path:', certPath);

if (!fs.existsSync(keyPath)) {
  console.error('SSL Key file does not exist at:', keyPath);
}

if (!fs.existsSync(certPath)) {
  console.error('SSL Cert file does not exist at:', certPath);
}

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
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath)
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
