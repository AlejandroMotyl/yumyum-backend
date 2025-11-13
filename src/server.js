import express from 'express';
import cors from 'cors';
import recipesRoutes from './routes/recipesRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';

export const app = express();
const PORT = process.env.PORT ?? 3000;

// ? Middleware
app.use(logger);
app.use(
  express.json({
    type: ['application/json', 'application/vnd.api+json'],
    limit: '100kb',
  }),
);
app.use(cors());
app.use(cookieParser());

// ? Routes
app.use(recipesRoutes);
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
