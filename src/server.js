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
import swaggerDocument from '../docs/swagger.json' with { type: "json" };

export const app = express();
const PORT = process.env.PORT ?? 3000;
swaggerDocument.host = PORT;

// ? Middleware
app.use(logger);
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://yumyum-frontend.vercel.app/',
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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
