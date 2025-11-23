import express from 'express';
import cors from 'cors';
import recipesRoutes from './routes/recipesRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import ingredientsRoutes from './routes/ingredientsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

export const app = express();
const PORT = process.env.PORT ?? 3000;
const BASE_URL =
  process.env.BASE_URL ||
  process.env.RENDER_EXTERNAL_URL ||
  `http://localhost:${PORT}`;

const swaggerPath = path.resolve(process.cwd(), 'docs', 'swagger.json');
let swaggerDocument = {};
try {
  swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));
  const base =
    process.env.BASE_URL ||
    process.env.RENDER_EXTERNAL_URL ||
    `http://localhost:${PORT}`;

  if (!Array.isArray(swaggerDocument.servers)) {
    swaggerDocument.servers = [{ url: base, description: 'API server' }];
  } else {
    const hasBase = swaggerDocument.servers.some((s) => s.url === base);
    if (!hasBase)
      swaggerDocument.servers.unshift({ url: base, description: 'API server' });
  }
} catch (err) {
  console.warn(
    'swagger.json not found or invalid — swagger UI disabled',
    err.message,
  );
}

// ? Middleware
app.use(logger);
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://yumyum-frontend.vercel.app',
  'https://nodejs-hw-zdyd.onrender.com',
];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

app.use(
  express.json({
    type: ['application/json', 'application/vnd.api+json'],
    limit: '100kb',
  }),
);

app.use(cookieParser());
if (Object.keys(swaggerDocument).length) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
// ? Routes
app.use(recipesRoutes);
app.use(ingredientsRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(categoriesRoutes);

// ! Error middleware
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

// ? Server listen
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${BASE_URL}`);
});
