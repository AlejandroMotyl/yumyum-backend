import createHttpError from 'http-errors';
import { Ingredient } from '../models/ingredient.js';

export const getIngredients = async (req, res, next) => {
  try {
    const result = await Ingredient.find().sort({ name: 1 });

    if (!result || result.length === 0) {
      throw createHttpError(404, 'No ingredients found');
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
};
