import { Router } from 'express';
import { Ingredient } from '../models/ingredients.js';

const router = Router();

router.get('/api/ingredients', async (req, res) => {
  const result = await Ingredient.find();
  res.json(result);
});

export default router;
