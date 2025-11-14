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
import multer from 'multer';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

const router = Router();

// multer memory storage + обмеження на файл
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Only image files are allowed'));
    } else {
      cb(null, true);
    }
  },
});

// middleware для завантаження thumb
const handleThumbUpload = async (req, res, next) => {
  if (req.file) {
    const result = await saveFileToCloudinary(req.file.buffer);
    req.body.thumb = result.secure_url;
  }
  next();
};

export const parseIngredients = (req, res, next) => {
  if (typeof req.body.ingredients === 'string') {
    req.body.ingredients = JSON.parse(req.body.ingredients);
  }
  next();
};

// !!!!!!!!!! Переробити з notes на recipes, обовязково використовуєм /api/recipes для всіх рутів. !!!!!!!!!

// TODO: створити публічний ендпоінт для пошуку рецептів за категорією, інгредієнтом, входженням пошукового значення в назву рецепту (з урахуванням логіки пагінації)

router.get('/api/recipes', celebrate(getAllRecipesSchema), getAllRecipesPublic);

// !!!
// TODO: створити публічний ендпоінт для отримання детальної інформації про рецепт за його id

router.get(
  '/api/recipes/id/:recipeId',
  celebrate(recipeIdSchema),
  getRecipeById,
);

// !!!

// TODO: створити приватний ендпоінт для створення власного рецепту

router.post(
  '/api/recipes/create-recipe',
  authenticate,
  upload.single('thumb'),
  handleThumbUpload,
  parseIngredients,
  celebrate(createRecipeSchema),
  createRecipe,
);

// !!!

// TODO: створити приватний ендпоінт для отримання власних рецептів
router.get(
  '/api/recipes/own',
  authenticate,
  celebrate(getAllUserRecipesSchema),
  getUserRecipes,
);

// TODO:створити приватний ендпоінт для додавання рецепту до списку улюблених

router.post(
  '/api/recipes/favorites/:recipeId',
  authenticate,
  celebrate(recipeIdSchema),
  addRecipeToFavorites,
);

// TODO:створити приватний ендпоінт для видалення рецепту зі списку улюблених

router.delete(
  '/api/recipes/favorites/:recipeId',
  authenticate,
  celebrate(recipeIdSchema),
  removeRecipeFromFavorites,
);

// TODO:створити приватний ендпоінт для отримання списку улюблених рецептів

router.get(
  '/api/recipes/favorites',
  authenticate,
  celebrate(getFavoriteRecipesSchema),
  getFavoriteRecipes,
);

// !!!

// ? Додаткове завдання для видалення власного рецепту
// router.delete('/notes/:noteId', celebrate(recipeIdSchema), deleteNote);

// ? Не чіпати, можливо для додаткового завдання реалізувати оновлення рецепту.
// router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

export default router;
