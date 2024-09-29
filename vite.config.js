import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});

const proxyOptions = (isProduction) => {
  const baseProxy = {
    '/uploads/': {
      target: `http://${process.env.SERVER_IP}:8080`,
      changeOrigin: true,
      secure: false,
    },
  };

  if (!isProduction) {
    baseProxy['/api/'] = {
      target: `http://${process.env.SERVER_IP}:8080`,
      changeOrigin: true,
      // rewrite: (path) => path.replace(/^\/api/, ''),
      secure: false,
      configure: (proxy, _options) => {
        proxy.on('error', (err, _req, _res) => {
          console.log('proxy error', err);
        });
        proxy.on('proxyReq', (proxyReq, req, _res) => {
          console.log('Sending Request to the Target:', req.method, req.url);
        });
        proxy.on('proxyRes', (proxyRes, req, _res) => {
          console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
        });
      },
    };
  }

  return baseProxy;
};

export default defineConfig(({mode}) => {
  const isProduction = mode === 'production';

  const serverOptions = {
    host: process.env.SERVER_IP,
    port: 3000,
    proxy: proxyOptions(isProduction),
    historyApiFallback: true,
  };

  if (process.env.USE_SSL === 'true' && isProduction) {
    const keyPath = process.env.SSL_KEY_PATH;
    const certPath = process.env.SSL_CERT_PATH;
    if (keyPath && certPath) {
      serverOptions.https = {
        key: fs.readFileSync(path.resolve(__dirname, keyPath)),
        cert: fs.readFileSync(path.resolve(__dirname, certPath)),
      };
    }
  }

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
