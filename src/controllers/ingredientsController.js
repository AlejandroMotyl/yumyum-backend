import createHttpError from 'http-errors';
import { Ingredient } from '../models/ingredient.js';

export const getIngredients = async (req, res, next) => {
  try {
    const result = await Ingredient.find();

    if (!result || result.length === 0) {
      throw createHttpError(404, 'No categories found');
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
};
