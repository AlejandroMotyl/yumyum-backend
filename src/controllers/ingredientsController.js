import { Ingredient } from '../models/ingredient.js';

export const getIngredients = async (req, res) => {
  const result = await Ingredient.find();
  res.json(result);
};
