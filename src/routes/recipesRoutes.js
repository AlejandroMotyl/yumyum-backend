import { Router } from 'express';
import {
  getAllRecipesPublic,
  getUserRecipes,
  getFavoriteRecipes,
  removeRecipeFromFavorites,
  addRecipeToFavorites,
  createRecipe,
  getRecipeById,
} from '../controllers/recipeController.js';
import {
  createRecipeSchema,
  getAllRecipesSchema,
  getAllUserRecipesSchema,
  getFavoriteRecipesSchema,
  recipeIdSchema,
} from '../validations/recipesValidation.js';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
import { parseIngredients } from '../utils/parseIngredients.js';

const router = Router();

router.get('/api/recipes', celebrate(getAllRecipesSchema), getAllRecipesPublic);

router.get(
  '/api/recipes/id/:recipeId',
  celebrate(recipeIdSchema),
  getRecipeById,
);

router.post(
  '/api/recipes/create-recipe',
  authenticate,
  upload.single('thumb'),
  parseIngredients,
  celebrate(createRecipeSchema),
  createRecipe,
);

router.get(
  '/api/recipes/own',
  authenticate,
  celebrate(getAllUserRecipesSchema),
  getUserRecipes,
);

router.post(
  '/api/recipes/favorites/:recipeId',
  authenticate,
  celebrate(recipeIdSchema),
  addRecipeToFavorites,
);

router.delete(
  '/api/recipes/favorites/:recipeId',
  authenticate,
  celebrate(recipeIdSchema),
  removeRecipeFromFavorites,
);

router.get(
  '/api/recipes/favorites',
  authenticate,
  celebrate(getFavoriteRecipesSchema),
  getFavoriteRecipes,
);

export default router;
