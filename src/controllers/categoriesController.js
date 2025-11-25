import createHttpError from 'http-errors';
import { Category } from '../models/category.js';

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });

    if (!categories || categories.length === 0) {
      throw createHttpError(404, 'No categories found');
    }

    res.json(categories);
  } catch (err) {
    next(err);
  }
};
