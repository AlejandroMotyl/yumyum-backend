import createHttpError from 'http-errors';
import { Category } from '../models/categories.js';

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    if (!categories || categories.length === 0) {
      throw createHttpError(404, 'No categories found');
    }

    res.json(categories);
  } catch (err) {
    next(err);
  }
};
