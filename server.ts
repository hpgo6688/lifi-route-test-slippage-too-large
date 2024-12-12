import express, { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware, RequestHandler } from 'http-proxy-middleware';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(
  '/',
  createProxyMiddleware({
    target: 'https://li.quest',
    changeOrigin: true,
    onProxyReq: (proxyReq: any) => {
      proxyReq.setHeader('X-Lifi-Api-Key', process.env.API_KEY || '');
    },
  }) as RequestHandler
);

console.log(123456);

const PORT = 8090;
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
