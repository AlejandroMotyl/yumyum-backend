import { Ingredient } from '../models/ingredients.js';

export const getIngredients = async (req, res) => {
  const result = await Ingredient.find();
  res.json(result);
};
