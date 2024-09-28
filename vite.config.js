import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});

export default defineConfig(({mode}) => {
  let serverOptions = {};

  if (process.env.USE_SSL === 'true' && mode === 'development') {
    const keyPath = process.env.SSL_KEY_PATH;
    const certPath = process.env.SSL_CERT_PATH;
    if (keyPath && certPath) {
      serverOptions.https = {
        key: fs.readFileSync(path.resolve(__dirname, keyPath)),
        cert: fs.readFileSync(path.resolve(__dirname, certPath)),
      };
    }
  }

  serverOptions.proxy = {
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
  }

  serverOptions.historyApiFallback = true;
  serverOptions.host = '192.168.1.20';
  serverOptions.port = 3000;

  return {
    plugins: [
      react(),
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    server: serverOptions,
  };
});
