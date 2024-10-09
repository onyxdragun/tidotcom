import express from 'express';
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import path from 'path';
import dotenv from 'dotenv';

import { getDirname } from './utils.js';
import { router as imageRouter } from './routers/image.js';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});

let server;
const app = express();

const __dirname = getDirname(import.meta.url);
console.log('__dirname is: ', __dirname);
const isProduction = process.env.NODE_ENV === 'production';
const staticPath = isProduction
  ? path.join(__dirname)
  : path.join(__dirname, process.env.STATIC_PATH || './');
const useSSL = process.env.USE_SSL === 'true';
const PORT = process.env.PORT || 8080;

console.log('UseSSL is', useSSL);
console.log('staticPath is set to ', staticPath);

if (useSSL) {
  const sslOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH)
  };

  // Craete HTTPS server with SSL Options
  server = https.createServer(sslOptions, app);
  console.log('Running with SSL');
} else {
  // HTTP without SSL
  server = app;
  console.log('Running without SSL');
}

app.use((req, res, next) => {
  console.log(`Requested URL: ${req.url}`);
  next();
});

if (!isProduction) {
  app.use(cors({
    origin: `http://${process.env.SERVER_IP}:3000`, // Vite Frontend
  }));
}

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.static(staticPath));
app.use(express.json());

app.use('/api', imageRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

// https.createServer(sslOptions, app).listen(PORT, process.env.SERVER_IP, () => {
//   console.log(`Server is running at ${process.env.SERVER_IP} on port ${PORT}`);
//   console.log(`Serving static files from ${staticPath}`);
// });

// app.listen(PORT, () => {
//   console.log("Server is running...");
// });

server.listen(PORT, process.env.SERVER_IP, () => {
  console.log(`Server is running at ${process.env.SERVER_IP} on port ${PORT}`);
  console.log(`Serving static files from ${staticPath}`);
})