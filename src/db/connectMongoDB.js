import mongoose from 'mongoose';
import { Recipe } from '../models/recipe.js';

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl);
    console.log('✅ MongoDB connection established successfully');
    await Recipe.syncIndexes();
    console.log('Indexes synced successfully');

    console.log(`Connected Db: `, mongoose.connection.name);
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};
